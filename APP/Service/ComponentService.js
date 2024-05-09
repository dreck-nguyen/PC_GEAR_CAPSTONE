import * as componentDAL from '../DAL/ComponentDAL.js';

export async function selectFormFactor() {
  return await componentDAL.selectFormFactor();
}

export async function createFormFactor(form_factor) {
  const gen = await componentDAL.genFormFactorMaxId();
  return await componentDAL.createFormFactor(gen.max_id, form_factor);
}
export async function updateFormFactor(formFactorId, formFactor) {
  return await componentDAL.updateFormFactor(formFactorId, formFactor);
}
export async function deleteFormFactor(formFactorId) {
  return await componentDAL.deleteFormFactor(formFactorId);
}

//
export async function selectProcessorSocket() {
  return await componentDAL.selectProcessorSocket();
}

export async function createProcessorSocket(socket) {
  const gen = await componentDAL.genProcessorSocketMaxId();
  return await componentDAL.createProcessorSocket(gen.max_id, socket);
}
export async function updateProcessorSocket(id, socket) {
  return await componentDAL.updateProcessorSocket(id, socket);
}
export async function deleteProcessorSocket(id) {
  return await componentDAL.deleteProcessorSocket(id);
}

//
export async function selectProcessorChipset() {
  return await componentDAL.selectProcessorChipset();
}

export async function createProcessorChipset(socket, chipset) {
  const gen = await componentDAL.genProcessorChipsetMaxId();
  return await componentDAL.createProcessorChipset(gen.max_id, socket, chipset);
}
export async function updateProcessorChipset(id, socket, chipset) {
  return await componentDAL.updateProcessorChipset(id, socket, chipset);
}
export async function deleteProcessorChipset(id) {
  return await componentDAL.deleteProcessorChipset(id);
}

//
export async function selectRamType() {
  return await componentDAL.selectRamType();
}

export async function createRamType(ram_type, data_rate, data_transfer_rate) {
  const gen = await componentDAL.genRamTypeMaxId();
  return await componentDAL.createRamType(
    gen.max_id,
    ram_type,
    data_rate,
    data_transfer_rate,
  );
}
export async function updateRamType(
  id,
  ram_type,
  data_rate,
  data_transfer_rate,
) {
  return await componentDAL.updateRamType(
    id,
    ram_type,
    data_rate,
    data_transfer_rate,
  );
}
export async function deleteRamType(id) {
  return await componentDAL.deleteRamType(id);
}

//

export async function selectStorageInterface() {
  return await componentDAL.selectStorageInterface();
}

export async function createStorageInterface(storage_interface) {
  const gen = await componentDAL.genStorageInterfaceMaxId();
  return await componentDAL.createStorageInterface(
    gen.max_id,
    storage_interface,
  );
}
export async function updateStorageInterface(
  storageInterfaceId,
  storage_interface,
) {
  return await componentDAL.updateStorageInterface(
    storageInterfaceId,
    storage_interface,
  );
}
export async function deleteStorageInterface(storageInterfaceId) {
  return await componentDAL.deleteStorageInterface(storageInterfaceId);
}

//
export async function selectGraphicsInterface() {
  return await componentDAL.selectGraphicsInterface();
}

export async function createGraphicsInterface(interface_type) {
  const gen = await componentDAL.genGraphicsInterfaceMaxId();
  return await componentDAL.createGraphicsInterface(gen.max_id, interface_type);
}
export async function updateGraphicsInterface(
  graphicsInterfaceId,
  interface_type,
) {
  return await componentDAL.updateGraphicsInterface(
    graphicsInterfaceId,
    interface_type,
  );
}
export async function deleteGraphicsInterface(graphicsInterfaceId) {
  return await componentDAL.deleteGraphicsInterface(graphicsInterfaceId);
}

//
export async function selectMotherboardChipset() {
  return await componentDAL.selectMotherboardChipset();
}

export async function createMotherboardChipset(chipset) {
  const gen = await componentDAL.genMotherboardChipsetMaxId();
  return await componentDAL.createMotherboardChipset(gen.max_id, chipset);
}
export async function updateMotherboardChipset(motherboardChipsetId, chipset) {
  return await componentDAL.updateMotherboardChipset(
    motherboardChipsetId,
    chipset,
  );
}
export async function deleteMotherboardChipset(motherboardChipsetId) {
  return await componentDAL.deleteMotherboardChipset(motherboardChipsetId);
}

//
export async function selectMotherboardSupportProcessor() {
  return await componentDAL.selectMotherboardSupportProcessor();
}

export async function createMotherboardSupportProcessor(
  motherboard_id,
  support_processor_type,
) {
  return await componentDAL.createMotherboardSupportProcessor(
    motherboard_id,
    support_processor_type,
  );
}
export async function updateMotherboardSupportProcessor(
  profileId,
  motherboard_id,
  support_processor_type,
) {
  return await componentDAL.updateMotherboardSupportProcessor(
    profileId,
    motherboard_id,
    support_processor_type,
  );
}
export async function deleteMotherboardSupportProcessor(profileId) {
  return await componentDAL.deleteMotherboardSupportProcessor(profileId);
}

//
export async function selectMotherboardSupportRam() {
  return await componentDAL.selectMotherboardSupportRam();
}

export async function createMotherboardSupportRam(
  motherboard_id,
  support_ram_type,
) {
  return await componentDAL.createMotherboardSupportRam(
    motherboard_id,
    support_ram_type,
  );
}
export async function updateMotherboardSupportRam(
  profileId,
  motherboard_id,
  support_ram_type,
) {
  return await componentDAL.updateMotherboardSupportRam(
    profileId,
    motherboard_id,
    support_ram_type,
  );
}
export async function deleteMotherboardSupportRam(profileId) {
  return await componentDAL.deleteMotherboardSupportRam(profileId);
}

//
export async function selectGraphicsModel() {
  return await componentDAL.selectGraphicsModel();
}

export async function createGraphicsModel(
  graphics_model,
  priority,
  graphics_chipset,
) {
  const gen = await componentDAL.genGraphicsModelMaxId();
  return await componentDAL.createGraphicsModel(
    gen.max_id,
    graphics_model,
    priority,
    graphics_chipset,
  );
}
export async function updateGraphicsModel(
  graphicsModelId,
  graphics_model,
  priority,
  graphics_chipset,
) {
  return await componentDAL.updateGraphicsModel(
    graphicsModelId,
    graphics_model,
    priority,
    graphics_chipset,
  );
}
export async function deleteGraphicsModel(graphicsModelId) {
  return await componentDAL.deleteGraphicsModel(graphicsModelId);
}

//
export async function selectProcessorModel() {
  return await componentDAL.selectProcessorModel();
}

export async function createProcessorModel(
  model,
  priority,
  chipset,
  cores,
  threads,
  model_number,
) {
  const gen = await componentDAL.genProcessorModelMaxId();
  return await componentDAL.createProcessorModel(
    gen.max_id,
    model,
    priority,
    chipset,
    cores,
    threads,
    model_number,
  );
}
export async function updateProcessorModel(
  processorModelId,
  model,
  priority,
  chipset,
  cores,
  threads,
  model_number,
) {
  return await componentDAL.updateProcessorModel(
    processorModelId,
    model,
    priority,
    chipset,
    cores,
    threads,
    model_number,
  );
}
export async function deleteProcessorModel(processorModelId) {
  return await componentDAL.deleteProcessorModel(processorModelId);
}

//
export async function selectRamModel() {
  return await componentDAL.selectRamModel();
}

export async function createRamModel(model) {
  const gen = await componentDAL.genRamModelMaxId();
  return await componentDAL.createRamModel(gen.max_id, model);
}
export async function updateRamModel(ramModelId, model) {
  return await componentDAL.updateRamModel(ramModelId, model);
}
export async function deleteRamModel(ramModelId) {
  return await componentDAL.deleteRamModel(ramModelId);
}

//
export async function selectCaseSupportFormFactor() {
  return await componentDAL.selectCaseSupportFormFactor();
}

export async function createCaseSupportFormFactor(case_id, form_factor) {
  return await componentDAL.createCaseSupportFormFactor(case_id, form_factor);
}
export async function updateCaseSupportFormFactor(
  profileId,
  case_id,
  form_factor,
) {
  return await componentDAL.updateCaseSupportFormFactor(
    profileId,
    case_id,
    form_factor,
  );
}
export async function deleteCaseSupportFormFactor(profileId) {
  return await componentDAL.deleteCaseSupportFormFactor(profileId);
}

//
export async function selectProcessorSupportRam() {
  return await componentDAL.selectProcessorSupportRam();
}

export async function createProcessorSupportRam(processor_id, ram_type) {
  return await componentDAL.createProcessorSupportRam(processor_id, ram_type);
}
export async function updateProcessorSupportRam(
  profileId,
  processor_id,
  ram_type,
) {
  return await componentDAL.updateProcessorSupportRam(
    profileId,
    processor_id,
    ram_type,
  );
}
export async function deleteProcessorSupportRam(profileId) {
  return await componentDAL.deleteProcessorSupportRam(profileId);
}
