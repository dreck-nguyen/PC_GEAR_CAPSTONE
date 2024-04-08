import * as commonEnums from '../Common/CommonEnums.js';
const PURPOSE = commonEnums.PURPOSE;
export function checkRole(loginUser, roleName) {
  console.log(loginUser, roleName);
  return loginUser.role === roleName;
}
export function convertToInches(value, unit) {
  const mmToInches = 0.0393701;
  const cmToInches = 0.393701;

  if (unit === 'mm') {
    return value * mmToInches;
  } else if (unit === 'cm') {
    return value * cmToInches;
  } else {
    return value;
  }
}
export function checkFitInCase(motherboardDimensions, caseInfo) {
  const motherboardLength = motherboardDimensions[0];
  const motherboardWidth = motherboardDimensions[1];

  const gpuLengthLimit = caseInfo.gpuLengthLimit;

  const fitsInLength = motherboardLength <= gpuLengthLimit;
  const fitsInWidth = motherboardWidth <= caseInfo.caseWidth;

  return fitsInLength && fitsInWidth;
}
export function extractNumberFromString(str) {
  const matches = str.match(/\d+(\.\d+)?/);
  return matches ? parseFloat(matches[0]) : null;
}
export function extractNumberFromCpuCoolerSupportSize(cpuCoolerSupportSize) {
  const regex = /[0-9]+(?:\.[0-9]+)?/g;
  const numbers = cpuCoolerSupportSize.match(regex);
  return numbers ? numbers.map(Number) : [];
}
export function hasFrequency(frequencyList, targetFrequency) {
  const [ramType, ramFreq] = targetFrequency.split('-');
  const ramFreqNum = extractNumberFromString(ramFreq);
  console.log(
    ramType,
    ramFreqNum,
    frequencyList.includes(ramType) && frequencyList.includes(ramFreqNum),
  );

  return frequencyList.includes(ramType) && frequencyList.includes(ramFreqNum);
}
export function getProductIds(jsonObject) {
  const filteredEntries = Object.entries(jsonObject).filter(
    ([key, value]) => value !== null,
  );

  const productIds = filteredEntries.map(([key, value]) => value);

  return productIds;
}
function checkRamType(ramType, minimumSpeed) {
  const speedMatch = ramType.match(/(\d+)\s*MHz/);

  if (speedMatch && speedMatch[1]) {
    const ramTypeInMHz = parseInt(speedMatch[1], 10);
    return ramTypeInMHz >= minimumSpeed;
  }

  return false;
}

export async function checkPurpose(purpose) {
  return purpose === PURPOSE.GAMING
    ? PURPOSE.GAMING
    : purpose === PURPOSE.OFFICE
    ? PURPOSE.OFFICE
    : null;
}

export function filterByPurpose(processors, purpose) {
  switch (purpose) {
    case PURPOSE.GAMING:
      return filterForGaming(processors);
    case PURPOSE.OFFICE:
      return filterForOffice(processors);
    default:
      return processors;
  }
}

export function filterForGaming(processors) {
  return processors.filter((processor) => {
    return (
      processor.core_quantity > 4 &&
      processor.threads_quantity > 8 &&
      processor.clock_speed >= 3.5
    );
  });
}

export function filterForOffice(processors) {
  return processors.filter((processor) => {
    return (
      processor.core_quantity > 2 &&
      processor.threads_quantity > 8 &&
      processor.power <= 200 &&
      (processor.socket.includes('LGA') || processor.socket.includes('AM4'))
    );
  });
}

export function filterByChipset(processors, chipset) {
  return processors.filter((processor) => processor.chipset === chipset);
}

export function filterByPurposeForGPU(gpus, purpose) {
  switch (purpose) {
    case PURPOSE.GAMING:
      return filterForGamingForGPU(gpus);
    case PURPOSE.OFFICE:
      return filterForOfficeForGPU(gpus);
    default:
      return gpus;
  }
}
export function filterForGamingForGPU(gpus) {
  console.log(gpus);
  return gpus.filter((gpu) => {
    return (
      gpu.VRAM >= 8 &&
      gpu['interface'].includes('PCIe 4.0') &&
      gpu.benchmark >= 8000
    );
  });
}

export function filterForOfficeForGPU(gpus) {
  return gpus;
}
export function filterByPurposeForRAM(rams, purpose) {
  switch (purpose) {
    case PURPOSE.GAMING:
      return filterForGamingForRAM(rams);
    case PURPOSE.OFFICE:
      return filterForOfficeForRAM(rams);
    default:
      return rams;
  }
}
export function filterForGamingForRAM(rams) {
  const minimumSpeed = 4000;
  return rams.filter((ram) => {
    return (
      ram.memory.includes('16 GB ') ||
      ram.memory.includes('32 GB ') ||
      checkRamType(ram.ram_type, minimumSpeed)
    );
  });
}
export function filterForOfficeForRAM(rams) {
  const minimumSpeed = 3000;
  return rams.filter((ram) => {
    return (
      ram.memory.includes('8 GB') ||
      ram.memory.includes('16 GB') ||
      ram.memory.includes('32 GB') ||
      checkRamType(ram.ram_type, minimumSpeed)
    );
  });
}
function convertStorageToGB(capacity) {
  const conversionTable = {
    TB: 1024, // 1 TB = 1024 GB
    GB: 1, // 1 GB = 1 GB
  };

  const match = capacity.match(/^(\d+)\s*(TB|GB)$/);
  if (match && match[1] && match[2]) {
    const amount = parseInt(match[1], 10);
    const unit = match[2];
    return amount * conversionTable[unit];
  }

  return null; // Return null if capacity format is invalid
}
export function filterByPurposeForStorage(storages, purpose) {
  switch (purpose) {
    case PURPOSE.GAMING:
      return filterForGamingForStorage(storages);
    case PURPOSE.OFFICE:
      return filterForOfficeForStorage(storages);
    default:
      return storages;
  }
}
export function filterForGamingForStorage(storages) {
  return storages.filter((storage) => {
    return (
      storage['interface'].includes('SATA') ||
      storage['interface'].includes('NVMe') ||
      convertStorageToGB(storage.capacity) >= 500
    );
  });
}
export function filterForOfficeForStorage(storages) {
  return storages.filter((storage) => {
    return (
      storage.type.includes('SSD') ||
      storage.type.includes('HDD') ||
      convertStorageToGB(storage.capacity) >= 500
    );
  });
}
// Duplicated for 1 Object

export function filterByPurposeForObject(processor, purpose) {
  switch (purpose) {
    case PURPOSE.GAMING:
      return filterForGamingForObject(processor);
    case PURPOSE.OFFICE:
      return filterForOfficeForObject(processor);
    default:
      return processor;
  }
}

export function filterForGamingForObject(processor) {
  return (
    processor.core_quantity > 4 &&
    processor.threads_quantity > 8 &&
    processor.clock_speed >= 3.5
  );
}

export function filterForOfficeForObject(processor) {
  return (
    processor.core_quantity > 2 &&
    processor.threads_quantity > 8 &&
    processor.power <= 200 &&
    (processor.socket.includes('LGA') || processor.socket.includes('AM4'))
  );
}

export function filterByPurposeForGPUForObject(gpu, purpose) {
  switch (purpose) {
    case PURPOSE.GAMING:
      return filterForGamingForGPUForObject(gpu);
    case PURPOSE.OFFICE:
      return filterForOfficeForGPUForObject(gpu);
    default:
      return gpu;
  }
}
export function filterForGamingForGPUForObject(gpu) {
  return (
    gpu.VRAM >= 8 &&
    gpu['interface'].includes('PCIe 4.0') &&
    gpu.benchmark >= 8000
  );
}

export function filterForOfficeForGPUForObject(gpus) {
  return gpus ? true : false;
}
export function filterByPurposeForRAMForObject(ram, purpose) {
  switch (purpose) {
    case PURPOSE.GAMING:
      return filterForGamingForRAMForObject(ram);
    case PURPOSE.OFFICE:
      return filterForOfficeForRAMForObject(ram);
    default:
      return ram;
  }
}
export function filterForGamingForRAMForObject(ram) {
  const minimumSpeed = 4000;

  return (
    ram.memory.includes('16 GB ') ||
    ram.memory.includes('32 GB ') ||
    checkRamType(ram.ram_type, minimumSpeed)
  );
}
export function filterForOfficeForRAMForObject(ram) {
  const minimumSpeed = 3000;

  return (
    ram.memory.includes('8 GB') ||
    ram.memory.includes('16 GB') ||
    ram.memory.includes('32 GB') ||
    checkRamType(ram.ram_type, minimumSpeed)
  );
}

export function filterByPurposeForStorageForObject(storage, purpose) {
  switch (purpose) {
    case PURPOSE.GAMING:
      return filterForGamingForStorageForObject(storage);
    case PURPOSE.OFFICE:
      return filterForOfficeForStorageForObject(storage);
    default:
      return storage;
  }
}
export function filterForGamingForStorageForObject(storage) {
  return (
    storage['interface'].includes('SATA') ||
    storage['interface'].includes('NVMe') ||
    convertStorageToGB(storage.capacity) >= 500
  );
}
export function filterForOfficeForStorageForObject(storage) {
  return (
    storage.type.includes('SSD') ||
    storage.type.includes('HDD') ||
    convertStorageToGB(storage.capacity) >= 500
  );
}
