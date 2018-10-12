export const HANDLE_ADVENTURE_START = 'HANDLE_ADVENTURE_START';

export const handle_adventure_start = () => {
  return {
    type: 'HANDLE_ADVENTURE_START',
    payload: { adventureStart: true },
  };
};