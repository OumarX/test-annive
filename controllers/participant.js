import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const create = async (req, res) => {
  try {
    const { email, lastname, firstname, code  } = req.body;

    // Vérifiez si le participant existe déjà
    const existingParticipant = await prisma.participant.findUnique({
      where: { email },
    });
    if (existingParticipant) {
      return res.status(400).json({ message: "Participant already exists" });
    }

    // Créez un nouveau participant
    const savedParticipant = await prisma.participant.create({
      data: { email, lastname, firstname, code  },
    });
    return res.status(201).json(savedParticipant);
  } catch (error) {
    console.error("Error in create:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const fetch = async (req, res) => {
  try {
    const participants = await prisma.participant.findMany();
    if (!participants || participants.length === 0) {
      return res.status(404).json({ message: "No participants found" });
    }
    res.status(200).json(participants);
  } catch (error) {
    console.error("Error in fetch:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchOne = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await prisma.participant.findUnique({
      where: { id: parseInt(id) },
    });
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }
    res.status(200).json(participant);
  } catch (error) {
    console.error("Error in fetchOne:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, lastname, firstname, code   } = req.body;

    // Vérifiez si le participant existe
    const existingParticipant = await prisma.participant.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    // Mettez à jour le participant
    const updatedParticipant = await prisma.participant.update({
      where: { id: parseInt(id) },
      data: { email, lastname, firstname, code },
    });
    res.status(200).json(updatedParticipant);
  } catch (error) {
    console.error("Error in update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifiez si le participant existe
    const existingParticipant = await prisma.participant.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingParticipant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    // Supprimez le participant
    await prisma.participant.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Participant deleted successfully" });
  } catch (error) {
    console.error("Error in deleteParticipant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};