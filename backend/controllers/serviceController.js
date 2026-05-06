import Service from "../models/Service.js";

export async function getServices(_req, res, next) {
  try {
    res.json(await Service.find({ active: true }).sort("-createdAt"));
  } catch (error) {
    next(error);
  }
}

export async function createService(req, res, next) {
  try {
    res.status(201).json(await Service.create(req.body));
  } catch (error) {
    next(error);
  }
}

export async function updateService(req, res, next) {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    next(error);
  }
}

export async function deleteService(req, res, next) {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (error) {
    next(error);
  }
}
