class VoiceProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this._buffer = new Float32Array(0);
    this._chunkSize =
      (options && options.processorOptions && options.processorOptions.chunkSize) || 4096;
    this._accum = [];
  }

  process(inputs, outputs, parameters) {
    try {
      const input = inputs[0];
      if (input && input[0]) {
        const channelData = input[0];
        // compute RMS for this frame
        let sum = 0;
        for (let i = 0; i < channelData.length; i++) {
          const v = channelData[i];
          sum += v * v;
        }
        const rms = Math.sqrt(sum / channelData.length);

        // accumulate
        const newBuf = new Float32Array(this._buffer.length + channelData.length);
        newBuf.set(this._buffer, 0);
        newBuf.set(channelData, this._buffer.length);
        this._buffer = newBuf;

        // if we have enough samples, post a chunk
        while (this._buffer.length >= this._chunkSize) {
          const chunk = this._buffer.subarray(0, this._chunkSize);
          // Transfer ArrayBuffer for efficiency
          this.port.postMessage({ type: 'chunk', samples: chunk.buffer, level: rms }, [
            chunk.buffer,
          ]);
          // remove sent samples
          this._buffer = this._buffer.subarray(this._chunkSize);
        }

        // also post a level-only update for UI responsiveness
        this.port.postMessage({ type: 'level', level: rms });
      }
    } catch (e) {
      // swallow errors to keep audio thread alive
    }
    return true;
  }
}

registerProcessor('voice-processor', VoiceProcessor);
