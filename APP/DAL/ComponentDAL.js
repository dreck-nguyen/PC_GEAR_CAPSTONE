import {
  FormFactor,
  ProcessorSocket,
  ProcessorChipset,
  RamType,
  StorageInterface,
  GraphicsInterface,
  MotherboardChipset,
  MotherboardSupportProcessor,
  MotherboardSupportRam,
  GraphicsModel,
  ProccessorModel,
  RamModel,
  SequelizeInstance,
  CaseSupportFormFactor,
  ProcessorSupportRam,
} from '../utility/DbHelper.js';
import * as commonFunction from '../Common/CommonFunction.js';
export async function genFormFactorMaxId() {
  const sqlQuery = `SELECT coalesce(MAX(id),0) + 1 AS max_id
                    FROM form_factor;`;
  const [result] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
export async function genProcessorSocketMaxId() {
  const sqlQuery = `SELECT coalesce(MAX(id),0) + 1 AS max_id
                    FROM processor_socket;`;
  const [result] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}
export async function selectFormFactor() {
  const sqlQuery = `select * from form_factor order by id`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createFormFactor(maxId, formFactor) {
  const { dataValues } = await FormFactor.create({
    id: maxId,
    form_factor: formFactor,
  });
  return dataValues;
}

export async function updateFormFactor(id, formFactor) {
  const [updatedCount] = await FormFactor.update(
    {
      form_factor: formFactor,
    },
    {
      where: { id },
    },
  );
  return updatedCount;
}

export async function deleteFormFactor(id) {
  const deletedCount = await FormFactor.destroy({
    where: { id },
  });
  return deletedCount;
}

//

export async function selectProcessorSocket() {
  const sqlQuery = `select * from processor_socket order by id`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createProcessorSocket(maxId, socket) {
  const { dataValues } = await ProcessorSocket.create({
    id: maxId,
    socket: socket,
  });
  return dataValues;
}

export async function updateProcessorSocket(id, socket) {
  const [updatedCount] = await ProcessorSocket.update(
    {
      socket,
    },
    {
      where: { id },
    },
  );
  return updatedCount;
}

export async function deleteProcessorSocket(id) {
  const deletedCount = await ProcessorSocket.destroy({
    where: { id },
  });
  return deletedCount;
}

//
export async function genProcessorChipsetMaxId() {
  const sqlQuery = `SELECT coalesce(MAX(id),0) + 1 AS max_id
                    FROM processor_chipset;`;
  const [result] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function selectProcessorChipset() {
  const sqlQuery = `SELECT id, processor_chipset, created_at, processor_socket
, processor_chipset || '-' || processor_socket as label 
FROM public.processor_chipset`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createProcessorChipset(maxId, socket, chipset) {
  const { dataValues } = await ProcessorChipset.create({
    id: maxId,
    processor_socket: socket,
    processor_chipset: chipset,
  });
  return dataValues;
}

export async function updateProcessorChipset(id, socket, chipset) {
  const [updatedCount] = await ProcessorChipset.update(
    {
      processor_socket: socket,
      processor_chipset: chipset,
    },
    {
      where: { id },
    },
  );
  return updatedCount;
}

export async function deleteProcessorChipset(id) {
  const deletedCount = await ProcessorChipset.destroy({
    where: { id },
  });
  return deletedCount;
}

//
export async function genRamTypeMaxId() {
  const sqlQuery = `SELECT coalesce(MAX(id),0) + 1 AS max_id
                    FROM ram_type;`;
  const [result] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function selectRamType() {
  const sqlQuery = `SELECT id, ram_type, created_at, data_rate, data_transfer_rate 
                    , ram_type || '-' || data_rate || 'Mhz ' || data_rate  || ' ' || data_transfer_rate  as label
                    FROM public.ram_type
                    order by id`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createRamType(
  maxId,
  ram_type,
  data_rate,
  data_transfer_rate,
) {
  const { dataValues } = await RamType.create({
    id: maxId,
    ram_type,
    data_rate,
    data_transfer_rate,
  });
  return dataValues;
}

export async function updateRamType(
  id,
  ram_type,
  data_rate,
  data_transfer_rate,
) {
  const [updatedCount] = await RamType.update(
    {
      ram_type,
      data_rate,
      data_transfer_rate,
    },
    {
      where: { id },
    },
  );
  return updatedCount;
}

export async function deleteRamType(id) {
  const deletedCount = await RamType.destroy({
    where: { id },
  });
  return deletedCount;
}

//
export async function genStorageInterfaceMaxId() {
  const sqlQuery = `SELECT coalesce(MAX(id),0) + 1 AS max_id
                    FROM storage_interface;`;
  const [result] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function selectStorageInterface() {
  const sqlQuery = `select * from storage_interface order by id`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createStorageInterface(maxId, storage_interface) {
  const { dataValues } = await StorageInterface.create({
    id: maxId,
    storage_interface,
  });
  return dataValues;
}

export async function updateStorageInterface(id, storage_interface) {
  const [updatedCount] = await StorageInterface.update(
    {
      storage_interface,
    },
    {
      where: { id },
    },
  );
  return updatedCount;
}

export async function deleteStorageInterface(id) {
  const deletedCount = await StorageInterface.destroy({
    where: { id },
  });
  return deletedCount;
}

//
export async function genGraphicsInterfaceMaxId() {
  const sqlQuery = `SELECT coalesce(MAX(id),0) + 1 AS max_id
                    FROM graphics_interface;`;
  const [result] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function selectGraphicsInterface() {
  const sqlQuery = `select * from graphics_interface order by id`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createGraphicsInterface(maxId, interface_type) {
  const { dataValues } = await GraphicsInterface.create({
    id: maxId,
    interface_type,
  });
  return dataValues;
}

export async function updateGraphicsInterface(id, interface_type) {
  const [updatedCount] = await GraphicsInterface.update(
    {
      interface_type,
    },
    {
      where: { id },
    },
  );
  return updatedCount;
}

export async function deleteGraphicsInterface(id) {
  const deletedCount = await GraphicsInterface.destroy({
    where: { id },
  });
  return deletedCount;
}

//
export async function genMotherboardChipsetMaxId() {
  const sqlQuery = `SELECT coalesce(MAX(id),0) + 1 AS max_id
                    FROM motherboard_chipset`;
  const [result] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function selectMotherboardChipset() {
  const sqlQuery = `select * from motherboard_chipset order by id`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createMotherboardChipset(maxId, chipset) {
  const { dataValues } = await MotherboardChipset.create({
    id: maxId,
    chipset,
  });
  return dataValues;
}

export async function updateMotherboardChipset(id, chipset) {
  const [updatedCount] = await MotherboardChipset.update(
    {
      chipset,
    },
    {
      where: { id },
    },
  );
  return updatedCount;
}

export async function deleteMotherboardChipset(id) {
  const deletedCount = await MotherboardChipset.destroy({
    where: { id },
  });
  return deletedCount;
}

//
export async function selectMotherboardSupportProcessor() {
  const sqlQuery = `select * from motherboard_support_processor order by created_at DESC`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createMotherboardSupportProcessor(
  motherboard_id,
  support_proccessor_type,
) {
  const { dataValues } = await MotherboardSupportProcessor.create({
    motherboard_id,
    support_proccessor_type,
  });
  return dataValues;
}

export async function updateMotherboardSupportProcessor(
  profileId,
  motherboardId,
  supportProccessorType,
) {
  const [updatedCount] = await MotherboardSupportProcessor.update(
    {
      motherboard_id: motherboardId,
      support_proccessor_type: supportProccessorType,
    },
    {
      where: { profile_id: profileId },
    },
  );
  return updatedCount;
}

export async function deleteMotherboardSupportProcessor(profileId) {
  const deletedCount = await MotherboardSupportProcessor.destroy({
    where: { profile_id: profileId },
  });
  return deletedCount;
}

//
export async function selectMotherboardSupportRam() {
  const sqlQuery = `select * from motherboard_support_ram order by created_at DESC`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createMotherboardSupportRam(
  motherboard_id,
  support_ram_type,
) {
  const { dataValues } = await MotherboardSupportRam.create({
    motherboard_id,
    support_ram_type,
  });
  return dataValues;
}

export async function updateMotherboardSupportRam(
  profileId,
  motherboard_id,
  support_ram_type,
) {
  const [updatedCount] = await MotherboardSupportRam.update(
    {
      motherboard_id,
      support_ram_type,
    },
    {
      where: { profile_id: profileId },
    },
  );
  return updatedCount;
}

export async function deleteMotherboardSupportRam(profileId) {
  const deletedCount = await MotherboardSupportRam.destroy({
    where: { profile_id: profileId },
  });
  return deletedCount;
}

//
export async function genGraphicsModelMaxId() {
  const sqlQuery = `SELECT coalesce(MAX(id),0) + 1 AS max_id
                    FROM graphics_model;`;
  const [result] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function selectGraphicsModel() {
  const sqlQuery = `select * from graphics_model order by id`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createGraphicsModel(
  maxId,
  graphics_model,
  priority,
  graphics_chipset,
) {
  const { dataValues } = await GraphicsModel.create({
    id: maxId,
    graphics_model,
    priority,
    graphics_chipset,
  });
  return dataValues;
}

export async function updateGraphicsModel(
  id,
  graphics_model,
  priority,
  graphics_chipset,
) {
  const [updatedCount] = await GraphicsModel.update(
    {
      graphics_model,
      priority,
      graphics_chipset,
    },
    {
      where: { id },
    },
  );
  return updatedCount;
}

export async function deleteGraphicsModel(id) {
  const deletedCount = await GraphicsModel.destroy({
    where: { id },
  });
  return deletedCount;
}

//
export async function genProcessorModelMaxId() {
  const sqlQuery = `SELECT coalesce(MAX(id),0) + 1 AS max_id
                    FROM proccessor_model;`;
  const [result] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function selectProcessorModel() {
  const sqlQuery = `select * from proccessor_model order by id`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createProcessorModel(
  maxId,
  model,
  priority,
  chipset,
  cores,
  threads,
  model_number,
) {
  const { dataValues } = await ProccessorModel.create({
    id: maxId,
    model,
    priority,
    chipset,
    cores,
    threads,
    model_number,
  });
  return dataValues;
}

export async function updateProcessorModel(
  id,
  model,
  priority,
  chipset,
  cores,
  threads,
  model_number,
) {
  const [updatedCount] = await ProccessorModel.update(
    {
      model,
      priority,
      chipset,
      cores,
      threads,
      model_number,
    },
    {
      where: { id },
    },
  );
  return updatedCount;
}

export async function deleteProcessorModel(id) {
  const deletedCount = await ProccessorModel.destroy({
    where: { id },
  });
  return deletedCount;
}

//
export async function genRamModelMaxId() {
  const sqlQuery = `SELECT coalesce(MAX(id),0) + 1 AS max_id
                    FROM ram_model;`;
  const [result] = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function selectRamModel() {
  const sqlQuery = `select * from ram_model order by id`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createRamModel(maxId, model) {
  const { dataValues } = await RamModel.create({
    id: maxId,
    model,
  });
  return dataValues;
}

export async function updateRamModel(id, model) {
  const [updatedCount] = await RamModel.update(
    {
      model,
    },
    {
      where: { id },
    },
  );
  return updatedCount;
}

export async function deleteRamModel(id) {
  const deletedCount = await RamModel.destroy({
    where: { id },
  });
  return deletedCount;
}

//
export async function selectCaseSupportFormFactor() {
  const sqlQuery = `select csff.*, ff.form_factor as label from case_support_form_factor csff
    inner join form_factor ff
    on 1=1
    and csff.form_factor = ff.id`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createCaseSupportFormFactor(case_id, form_factor) {
  const { dataValues } = await CaseSupportFormFactor.create({
    case_id,
    form_factor,
  });
  return dataValues;
}

export async function updateCaseSupportFormFactor(id, case_id, form_factor) {
  const [updatedCount] = await CaseSupportFormFactor.update(
    {
      case_id,
      form_factor,
    },
    {
      where: { profile_id: id },
    },
  );
  return updatedCount;
}

export async function deleteCaseSupportFormFactor(id) {
  const deletedCount = await CaseSupportFormFactor.destroy({
    where: { profile_id: id },
  });
  return deletedCount;
}

//
export async function selectProcessorSupportRam() {
  const sqlQuery = `
  select psr.*, rt.ram_type || '-' || rt.data_rate as label
  from proccessor_support_ram psr
  inner join ram_type rt
  on rt.id = psr.ram_type`;
  const result = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });
  return result;
}

export async function createProcessorSupportRam(processor_id, ram_type) {
  const { dataValues } = await ProcessorSupportRam.create({
    processor_id,
    ram_type,
  });
  return dataValues;
}

export async function updateProcessorSupportRam(id, processor_id, ram_type) {
  const [updatedCount] = await ProcessorSupportRam.update(
    {
      processor_id,
      ram_type,
    },
    {
      where: { profile_id: id },
    },
  );
  return updatedCount;
}

export async function deleteProcessorSupportRam(id) {
  const deletedCount = await ProcessorSupportRam.destroy({
    where: { profile_id: id },
  });
  return deletedCount;
}
