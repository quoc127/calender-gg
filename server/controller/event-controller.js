const Event = require("../models/Event");

module.exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ deleted: false });

    const formattedEvents = events.map((event) => {
      return {
        id: event._id,
        title: event.title,
        start: event.start,
        end: event.end,
        type: event.type,
        url: event.url
      };
    });

    res.status(200).json({
      success: true,
      message: "Get all events successfully",
      data: formattedEvents,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.postEvent = async (req, res) => {
  try {
    const { title, start, end, type, url } = req.body;
    const newEvent = new Event({
      title: title,
      start: new Date(start),
      end: new Date(end),
      type: type,
      url: url,
    });
    await newEvent.save();
    return res.status(201).json({
      success: true,
      message: "Create event successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Delete event successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "Delete event successfully",
    });
  }
};

module.exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start, end, type, url } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title: title,
        start: start,
        end: end,
        type: type,
        url: url,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
