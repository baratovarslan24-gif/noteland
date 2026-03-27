import * as migration_20260322_233106_initial from './20260322_233106_initial';
import * as migration_20260327_101810_add_user_role from './20260327_101810_add_user_role';

export const migrations = [
  {
    up: migration_20260322_233106_initial.up,
    down: migration_20260322_233106_initial.down,
    name: '20260322_233106_initial',
  },
  {
    up: migration_20260327_101810_add_user_role.up,
    down: migration_20260327_101810_add_user_role.down,
    name: '20260327_101810_add_user_role'
  },
];
