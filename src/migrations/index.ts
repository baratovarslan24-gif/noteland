import * as migration_20260322_233106_initial from './20260322_233106_initial';
import * as migration_20260327_101810_add_user_role from './20260327_101810_add_user_role';
import * as migration_20260327_102947_add_categories from './20260327_102947_add_categories';
import * as migration_20260330_085657_add_brands_table from './20260330_085657_add_brands_table';
import * as migration_20260330_092032_app_products_table from './20260330_092032_app_products_table';
import * as migration_20260330_102308_add_orders_table from './20260330_102308_add_orders_table';
import * as migration_20260331_132551_add_storeinfo_table from './20260331_132551_add_storeinfo_table';
import * as migration_20260401_085429_add_featured_product_list_table from './20260401_085429_add_featured_product_list_table';
import * as migration_20260401_090956_app_about_table from './20260401_090956_app_about_table';
import * as migration_20260401_091646_add_delivery_table from './20260401_091646_add_delivery_table';
import * as migration_20260401_092050_add_privacy_policy from './20260401_092050_add_privacy_policy';
import * as migration_20260401_092734_app_return from './20260401_092734_app_return';
import * as migration_20260401_093740_changed_code_in_storeinfo from './20260401_093740_changed_code_in_storeinfo';
import * as migration_20260401_094731_add_termsofuse from './20260401_094731_add_termsofuse';

export const migrations = [
  {
    up: migration_20260322_233106_initial.up,
    down: migration_20260322_233106_initial.down,
    name: '20260322_233106_initial',
  },
  {
    up: migration_20260327_101810_add_user_role.up,
    down: migration_20260327_101810_add_user_role.down,
    name: '20260327_101810_add_user_role',
  },
  {
    up: migration_20260327_102947_add_categories.up,
    down: migration_20260327_102947_add_categories.down,
    name: '20260327_102947_add_categories',
  },
  {
    up: migration_20260330_085657_add_brands_table.up,
    down: migration_20260330_085657_add_brands_table.down,
    name: '20260330_085657_add_brands_table',
  },
  {
    up: migration_20260330_092032_app_products_table.up,
    down: migration_20260330_092032_app_products_table.down,
    name: '20260330_092032_app_products_table',
  },
  {
    up: migration_20260330_102308_add_orders_table.up,
    down: migration_20260330_102308_add_orders_table.down,
    name: '20260330_102308_add_orders_table',
  },
  {
    up: migration_20260331_132551_add_storeinfo_table.up,
    down: migration_20260331_132551_add_storeinfo_table.down,
    name: '20260331_132551_add_storeinfo_table',
  },
  {
    up: migration_20260401_085429_add_featured_product_list_table.up,
    down: migration_20260401_085429_add_featured_product_list_table.down,
    name: '20260401_085429_add_featured_product_list_table',
  },
  {
    up: migration_20260401_090956_app_about_table.up,
    down: migration_20260401_090956_app_about_table.down,
    name: '20260401_090956_app_about_table',
  },
  {
    up: migration_20260401_091646_add_delivery_table.up,
    down: migration_20260401_091646_add_delivery_table.down,
    name: '20260401_091646_add_delivery_table',
  },
  {
    up: migration_20260401_092050_add_privacy_policy.up,
    down: migration_20260401_092050_add_privacy_policy.down,
    name: '20260401_092050_add_privacy_policy',
  },
  {
    up: migration_20260401_092734_app_return.up,
    down: migration_20260401_092734_app_return.down,
    name: '20260401_092734_app_return',
  },
  {
    up: migration_20260401_093740_changed_code_in_storeinfo.up,
    down: migration_20260401_093740_changed_code_in_storeinfo.down,
    name: '20260401_093740_changed_code_in_storeinfo',
  },
  {
    up: migration_20260401_094731_add_termsofuse.up,
    down: migration_20260401_094731_add_termsofuse.down,
    name: '20260401_094731_add_termsofuse'
  },
];
