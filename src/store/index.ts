import { createStore } from 'vuex'

export default createStore({
  state: {
    muted: false,
    playing: false,
    selected: false,
    currentTime: 0,
    duration: 0,
    loop: false,
    url: '',
    name: '',
    files: [] as FileSystemHandle[],
    audio: new Audio(),
  },
  getters: {
    getCurrentFileIndex(state) {
      return state.files.findIndex(value => value.name === state.name)
    }
  },
  mutations: {
    toggleMuted(state) {
      state.muted = !state.muted;
      if (state.muted) {
        state.audio.muted = true;
      } else {
        state.audio.muted = false
      }
    },
    setPlaying(state, payload: boolean) {
      state.playing = payload;
      if (payload) {
        state.audio.play();
      } else {
        state.audio.pause();
      }
    },
    togglePlaying(state) {
      state.playing = !state.playing;
      if (state.playing) {
        state.audio.play();
      } else {
        state.audio.pause();
      }
    },
    setSelected(state, payload: boolean) {
      state.selected = payload;
    },
    setCurrentTime(state, payload: number) {
      state.currentTime = payload;
    },
    setDuration(state, payload: number) {
      state.duration = payload;
    },
    toggleLoop(state) {
      state.loop = !state.loop;
    },
    setUrl(state, payload: string) {
      URL.revokeObjectURL(state.url);
      state.audio.src = payload;
      state.url = payload;
    },
    setName(state, payload: string) {
      state.name = payload;
    },
    setFiles(state, payload: FileSystemHandle[]) {
      state.files = payload;
    },
  },
  actions: {
    async SelectFolder({ commit }) {
      const folder = await window.showDirectoryPicker();
      let files: FileSystemHandle[] = [];
      for await (const file of folder.values()) {
        files.push(file);
      }
      const regex = /mp3|ogg|wav/g;
      files = files.filter(value => {
        const name = value.name.split('.');
        return name[ name.length - 1 ].match(regex);
      })
      commit('setFiles', files);
      commit('setPlaying', false);
      commit('setSelected', false);
    },
    async playFile({ commit, state }, index: number) {
      const fileHandle = state.files[ index ];
      if (fileHandle.kind === 'file') {
        const file = await fileHandle.getFile();
        const url = URL.createObjectURL(file);
        commit('setUrl', url);
        commit('setPlaying', true);
        commit('setSelected', true);
        commit('setName', file.name);
        commit('setCurrentTime', 0);
        commit('setDuration', 0);
      }
    },
    async PlayNext({ commit, state, getters, dispatch }, nextButton = false) {
      if (state.loop && !nextButton) {
        state.audio.currentTime = 0;
        state.audio.play();
      } else {
        const currentIndex = getters.getCurrentFileIndex;
        if (currentIndex + 1 !== state.files.length) {
          dispatch('playFile', currentIndex + 1);
        }
      }
    },
    async PlayPrevious({ commit, state, getters, dispatch }) {
      if (state.currentTime > 10) {
        state.audio.currentTime = 0;
        state.audio.play();
      } else {
        if (getters.getCurrentFileIndex !== 0) {
          const currentIndex = getters.getCurrentFileIndex - 1;
          dispatch('playFile', currentIndex);
        }
      }
    },
    Reset({ commit }) {
      commit('setPlaying', false);
      commit('setSelected', false);
      commit('setCurrentTime', 0);
      commit('setDuration', 0);
      commit('setUrl', '');
      commit('setName', '');
      commit('setFiles', []);
    }
  },
})
