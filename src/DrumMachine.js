import React, { useEffect, useMemo, useState } from 'react';

const drumsKey = {
  Q: 'https://dight310.byu.edu/media/audio/soundfx/ohh.mp3',
  W: 'https://dight310.byu.edu/media/audio/soundfx/splat.wav',
  E:
    'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Gospel%20Hit-7488-Free-Loops.com.mp3',
  A: 'https://dight310.byu.edu/media/audio/KEWL.WAV',
  S: 'https://dight310.byu.edu/media/audio/propplanefast.wav',
  D: 'https://dight310.byu.edu/media/audio/soundfx/splat.wav',
  Z: 'https://dight310.byu.edu/media/audio/KEWL.WAV',
  X: 'https://dight310.byu.edu/media/audio/soundfx/ohh.mp3',
  C:
    'https://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Gospel%20Hit-7488-Free-Loops.com.mp3',
};

const DrumMachine = () => {
  const [sound, setSound] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', onSoundHandler);
  }, []);

  const drumPad = useMemo(() => {
    return Object.keys(drumsKey).map((item, index) => {
      return (
        <button
          type='button'
          className='shadow-none drum-pad btn btn-secondary m-1 p-5'
          style={{ width: '110px' }}
          onClick={ev => onSoundHandler(ev)}
          key={index}
          id={'id_' + item}>
          <audio className='clip' id={item} src={drumsKey[item]}></audio>
          {item}
        </button>
      );
    });
  }, []);

  const onSoundHandler = ev => {
    const key = ev.key
      ? ev.key.toUpperCase()
      : undefined || ev.target.innerText;

    if (drumsKey[key]) {
      const audioEl = document.getElementById(key);
      const soundButtonEl = document.getElementById('id_' + key);

      audioEl.play();

      setSound(() => audioEl.id);
      soundButtonEl.focus();

      setTimeout(() => {
        setSound(() => '');
        soundButtonEl.blur();
      }, 200);
    }
  };

  return (
    <div>
      <div id='display' className='p-5 text-center'>
        {drumPad}
        <div style={{ height: '50px' }} className='m-2 text-light'>
          {sound}{' '}
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
