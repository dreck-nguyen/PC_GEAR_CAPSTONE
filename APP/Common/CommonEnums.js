export const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  STAFF: 'STAFF',
};

export const PURPOSE = {
  GAMING: 'GAMING',
  OFFICE: 'OFFICE',
};
export const COMMON = {
  RULE: {
    gaming: {
      processors: {
        'core_quantity > 4': true,
        'threads_quantity > 8': true,
        'clock_speed >= 3.5': true,
      },
      gpus: {
        'vram >= 8': true,
        "interface includes 'PCIe 4.0'": true,
        'benchmark >= 8000': true,
      },
      rams: {
        "memory includes '16 GB ' or '32 GB '": true,
        'ram_type >= 4000 MHz': true,
      },
      storages: {
        "interface includes 'SATA' or 'NVMe'": true,
        'capacity >= 500 GB': true,
      },
    },
    office: {
      processors: {
        'core_quantity > 2': true,
        'threads_quantity > 8': true,
        'power <= 200': true,
        "socket includes 'LGA' or 'AM4'": true,
      },
      gpus: {
        'Not filtered for office use': true,
      },
      rams: {
        "memory includes '8 GB', '16 GB', or '32 GB'": true,
        'ram_type >= 3000 MHz': true,
      },
      storages: {
        "type includes 'SSD' or 'HDD'": true,
        'capacity >= 500 GB': true,
      },
    },
  },
};
