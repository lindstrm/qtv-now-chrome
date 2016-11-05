import ls from '../helpers/storage';
import * as types from './mutation-types';

export const save = store => {
  store.subscribe((mutation) => {
    if (mutation.type === types.SAVE_SETTINGS) {
      ls.save('settings', store.state.settings);
    }
  });
};

export const load = store => {
  if(ls.get('settings')) {
    store.commit(types.LOAD_SETTINGS, ls.get('settings'))
  }
}