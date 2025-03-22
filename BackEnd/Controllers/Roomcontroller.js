const Room = require("../Model/RoomModel");

// Fetch all rooms
const GetAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }
    return res.status(200).json({ Room: rooms }); // Wrap the response in a "Room" object
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new room
const addrooms = async (req, res, next) => {
  const { roomNumber, roomType, pricePerNight, features, capacity, status, description, imageUrl } = req.body;

  try {
    const newRoom = new Room({ roomNumber, roomType, pricePerNight, features, capacity, status, description, imageUrl });
    await newRoom.save(); // Save to the database
    return res.status(201).json(newRoom); // Return the newly created room
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to add room" });
  }
};

// Get room by ID
const getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json(room);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update room by ID
const updateRooms = async (req, res, next) => {
  const id = req.params.id;
  const { roomNumber, roomType, pricePerNight, features, capacity, status, description, imageUrl } = req.body;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { roomNumber, roomType, pricePerNight, features, capacity, status, description, imageUrl },
      { new: true } // Return the updated document
    );
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json(updatedRoom);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update room" });
  }
};

// Delete room by ID
const deleterooms = async (req, res, next) => {
  const id = req.params.id;
  console.log("Deleting room with ID:", id); // Debugging: Log the room ID

  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      console.log("Room not found with ID:", id); // Debugging
      return res.status(404).json({ message: "Room not found" });
    }
    console.log("Room deleted successfully:", deletedRoom); // Debugging
    return res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error); // Debugging
    return res.status(500).json({ message: "Failed to delete room", error: error.message });
  }
};

// Export the functions
exports.GetAllRooms = GetAllRooms;
exports.addrooms = addrooms;
exports.getById = getById;
exports.updateRooms = updateRooms;
exports.deleterooms = deleterooms;