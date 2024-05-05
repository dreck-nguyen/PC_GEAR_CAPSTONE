import { SequelizeInstance } from '../utility/DbHelper.js';
import * as commonFunction from '../Common/CommonFunction.js';
import * as componentService from '../Service/ComponentService.js';

export async function selectFormFactor(req, res, next) {
  try {
    const result = await componentService.selectFormFactor();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createFormFactor(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { form_factor } = req.body;
    const result = await componentService.createFormFactor(form_factor);
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.status(500).send(e);
  }
}
export async function updateFormFactor(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const formFactorId = req.params.formFactorId;
    const { form_factor } = req.body;
    await componentService.updateFormFactor(formFactorId, form_factor);
    res.send({ message: `UPDATE FORM FACTOR WITH ID ${formFactorId}` });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteFormFactor(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const formFactorId = commonFunction.validateNumber(req.params.formFactorId);
    await componentService.deleteFormFactor(formFactorId);
    res.send({ message: `DELETE FORM FACTOR WITH ID ${formFactorId}` });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}

//
export async function selectProcessorSocket(req, res, next) {
  try {
    const result = await componentService.selectProcessorSocket();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createProcessorSocket(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { socket } = req.body;
    const result = await componentService.createProcessorSocket(socket);
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function updateProcessorSocket(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const processorSocketId = req.params.processorSocketId;
    const { socket } = req.body;
    await componentService.updateProcessorSocket(processorSocketId, socket);
    res.send({
      message: `UPDATE PROCESSOR SOCKET WITH ID ${processorSocketId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteProcessorSocket(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const processorSocketId = req.params.processorSocketId;
    await componentService.deleteProcessorSocket(processorSocketId);
    res.send({
      message: `DELETE PROCESSOR SOCKET WITH ID ${processorSocketId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}

//
export async function selectProcessorChipset(req, res, next) {
  try {
    const result = await componentService.selectProcessorChipset();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createProcessorChipset(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { processor_socket, processor_chipset } = req.body;
    const result = await componentService.createProcessorChipset(
      processor_socket,
      processor_chipset,
    );
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function updateProcessorChipset(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const processorChipsetId = req.params.processorChipsetId;
    const { processor_socket, processor_chipset } = req.body;
    await componentService.updateProcessorChipset(
      processorChipsetId,
      processor_socket,
      processor_chipset,
    );
    res.send({
      message: `UPDATE PROCESSOR CHIPSET WITH ID ${processorChipsetId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteProcessorChipset(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const processorChipsetId = req.params.processorChipsetId;
    await componentService.deleteProcessorChipset(processorChipsetId);
    res.send({
      message: `DELETE PROCESSOR CHIPSET WITH ID ${processorChipsetId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}

//
export async function selectRamType(req, res, next) {
  try {
    const result = await componentService.selectRamType();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createRamType(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { ram_type, data_rate, data_transfer_rate } = req.body;
    const result = await componentService.createRamType(
      ram_type,
      data_rate,
      data_transfer_rate,
    );
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function updateRamType(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const ramTypeId = req.params.ramTypeId;
    const { ram_type, data_rate, data_transfer_rate } = req.body;
    await componentService.updateRamType(
      ramTypeId,
      ram_type,
      data_rate,
      data_transfer_rate,
    );
    res.send({
      message: `UPDATE RAM TYPE WITH ID ${ramTypeId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteRamType(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const ramTypeId = req.params.ramTypeId;
    await componentService.deleteRamType(ramTypeId);
    res.send({
      message: `DELETE RAM TYPE WITH ID ${ramTypeId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}

//
export async function selectStorageInterface(req, res, next) {
  try {
    const result = await componentService.selectStorageInterface();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createStorageInterface(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { storage_interface } = req.body;
    const result = await componentService.createStorageInterface(
      storage_interface,
    );
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function updateStorageInterface(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const storageInterfaceId = req.params.storageInterfaceId;
    const { storage_interface } = req.body;
    await componentService.updateStorageInterface(
      storageInterfaceId,
      storage_interface,
    );
    res.send({
      message: `UPDATE STORAGE INTERFACE WITH ID ${storageInterfaceId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteStorageInterface(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const storageInterfaceId = req.params.storageInterfaceId;
    await componentService.deleteStorageInterface(storageInterfaceId);
    res.send({
      message: `DELETE STORAGE INTERFACE WITH ID ${storageInterfaceId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}

//
export async function selectGraphicsInterface(req, res, next) {
  try {
    const result = await componentService.selectGraphicsInterface();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createGraphicsInterface(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { interface_type } = req.body;
    const result = await componentService.createGraphicsInterface(
      interface_type,
    );
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function updateGraphicsInterface(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const graphicsInterfaceId = req.params.graphicsInterfaceId;
    const { interface_type } = req.body;
    await componentService.updateGraphicsInterface(
      graphicsInterfaceId,
      interface_type,
    );
    res.send({
      message: `UPDATE GRAPHICS INTERFACE WITH ID ${graphicsInterfaceId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteGraphicsInterface(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const graphicsInterfaceId = req.params.graphicsInterfaceId;
    await componentService.deleteGraphicsInterface(graphicsInterfaceId);
    res.send({
      message: `DELETE GRAPHICS INTERFACE WITH ID ${graphicsInterfaceId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}

//
export async function selectMotherboardChipset(req, res, next) {
  try {
    const result = await componentService.selectMotherboardChipset();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createMotherboardChipset(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { chipset } = req.body;
    const result = await componentService.createMotherboardChipset(chipset);
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function updateMotherboardChipset(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const motherboardChipsetId = req.params.motherboardChipsetId;
    const { chipset } = req.body;
    await componentService.updateMotherboardChipset(
      motherboardChipsetId,
      chipset,
    );
    res.send({
      message: `UPDATE MOTHERBOARD CHIPSET WITH ID ${motherboardChipsetId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteMotherboardChipset(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const motherboardChipsetId = req.params.motherboardChipsetId;
    await componentService.deleteMotherboardChipset(motherboardChipsetId);
    res.send({
      message: `DELETE MOTHERBOARD CHIPSET WITH ID ${motherboardChipsetId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}

//
export async function selectMotherboardSupportProcessor(req, res, next) {
  try {
    const result = await componentService.selectMotherboardSupportProcessor();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createMotherboardSupportProcessor(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { motherboard_id, support_proccessor_type } = req.body;
    const result = await componentService.createMotherboardSupportProcessor(
      motherboard_id,
      support_proccessor_type,
    );
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function updateMotherboardSupportProcessor(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const profileId = req.params.profileId;
    const { motherboard_id, support_proccessor_type } = req.body;
    await componentService.updateMotherboardSupportProcessor(
      profileId,
      motherboard_id,
      support_proccessor_type,
    );
    res.send({
      message: `UPDATE MOTHERBOARD SUPPORT PROCESSOR WITH PROFILE ID ${profileId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteMotherboardSupportProcessor(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const profileId = req.params.profileId;
    await componentService.deleteMotherboardSupportProcessor(profileId);
    res.send({
      message: `DELETE MOTHERBOARD SUPPORT PROCESSOR WITH PROFILE ID ${profileId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}

//
export async function selectMotherboardSupportRam(req, res, next) {
  try {
    const result = await componentService.selectMotherboardSupportRam();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createMotherboardSupportRam(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { motherboard_id, support_ram_type } = req.body;
    const result = await componentService.createMotherboardSupportRam(
      motherboard_id,
      support_ram_type,
    );
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function updateMotherboardSupportRam(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const profileId = req.params.profileId;
    const { motherboard_id, support_ram_type } = req.body;
    await componentService.updateMotherboardSupportRam(
      profileId,
      motherboard_id,
      support_ram_type,
    );
    res.send({
      message: `UPDATE MOTHERBOARD SUPPORT RAM WITH PROFILE ID ${profileId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteMotherboardSupportRam(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const profileId = req.params.profileId;
    await componentService.deleteMotherboardSupportRam(profileId);
    res.send({
      message: `DELETE MOTHERBOARD SUPPORT RAM WITH PROFILE ID ${profileId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}

//
export async function selectGraphicsModel(req, res, next) {
  try {
    const result = await componentService.selectGraphicsModel();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createGraphicsModel(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { graphics_model, priority, graphics_chipset } = req.body;
    const result = await componentService.createGraphicsModel(
      graphics_model,
      priority,
      graphics_chipset,
    );
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function updateGraphicsModel(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const graphicsModelId = req.params.graphicsModelId;
    const { graphics_model, priority, graphics_chipset } = req.body;
    await componentService.updateGraphicsModel(
      graphicsModelId,
      graphics_model,
      priority,
      graphics_chipset,
    );
    res.send({
      message: `UPDATE GRAPHICS MODEL WITH ID ${graphicsModelId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteGraphicsModel(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const graphicsModelId = req.params.graphicsModelId;
    await componentService.deleteGraphicsModel(graphicsModelId);
    res.send({
      message: `DELETE GRAPHICS MODEL WITH ID ${graphicsModelId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}

//
export async function selectProcessorModel(req, res, next) {
  try {
    const result = await componentService.selectProcessorModel();
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
export async function createProcessorModel(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const { model, priority, chipset, cores, threads, model_number } = req.body;
    const result = await componentService.createProcessorModel(
      model,
      priority,
      chipset,
      cores,
      threads,
      model_number,
    );
    res.send(result);
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function updateProcessorModel(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const processorModelId = req.params.processorModelId;
    const { model, priority, chipset, cores, threads, model_number } = req.body;
    await componentService.updateProcessorModel(
      processorModelId,
      model,
      priority,
      chipset,
      cores,
      threads,
      model_number,
    );
    res.send({
      message: `UPDATE PROCESSOR MODEL WITH ID ${processorModelId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
export async function deleteProcessorModel(req, res, next) {
  const t = await SequelizeInstance.transaction();
  try {
    const processorModelId = req.params.processorModelId;
    await componentService.deleteProcessorModel(processorModelId);
    res.send({
      message: `DELETE PROCESSOR MODEL WITH ID ${processorModelId}`,
    });
    t.commit();
  } catch (e) {
    t.rollback();
    console.log(e);
    res.send(e);
  }
}
