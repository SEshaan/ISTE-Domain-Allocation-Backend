import type {Response, Request} from 'express';
import { Domain } from '../../models/domain.js';

export const getDomain = async (req: Request, res: Response) => {
    try {
        const { domainId } = req.params;
        const domain = await Domain.findById(domainId);
        if (!domain) {
            return res.status(404).json({message: "Domain not found"});
        }
        res.status(200).json({message: "Domain fetched successfully", data:domain});
    } catch (error) {
        console.error("Error fetching domain:\n", error);
        res.status(500).json({ message: "Error while fetching domain" });
    }
};

export const getAllDomains = async (req: Request, res: Response) => {
    try {
        const domains = await Domain.find();
        res.status(200).json({message: "Domains fetched successfully", data:domains});
    } catch (error) {
        console.error("Error fetching domains:\n", error);
        res.status(500).json({ message: "Error while fetching domains" });
    }
};

export const addDomain = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }

        const newDomain = await Domain.create({ name, description }).catch((error) => {
            if (error.code === 11000) {
                return res.status(400).json({ message: "Domain already exists" });
            }
            throw error;
        });

        if (!newDomain) return;

        res.status(201).json({message: "Domain added successfully", data: newDomain });
    } catch (error) {
        console.error("Error adding domain:\n", error);
        res.status(500).json({message: "Error while adding Domain"});
    }
};

export const removeDomain = async (req: Request, res: Response) => {
    try {
        const {domainId} = req.params;
        const deletedDomain = await Domain.findByIdAndDelete(domainId);
        if (!deletedDomain) {
            return res.status(404).json({ message: "Domain not found" });
        }
        res.status(200).json({ message: "Domain deleted successfully" });
    } catch (error) {
        console.error("Error removing domain:\n", error);
        res.status(500).json({ message: "Error while deleting Domain"});
    }
};

export const updateDomain = async (req: Request, res: Response) => {
    try {
        const {domainId} = req.params;
        const {name, description} = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }

        const updatedDomain = await Domain.findByIdAndUpdate(
            domainId,
            { name, description },
            { new: true }
        );
        if (!updatedDomain) {
            return res.status(404).json({ message: "Domain not found" });
        }
        res.status(200).json({message: "Domain updated successfully", data: updatedDomain});
    } catch (error) {
        console.error("Error updating domain:\n", error);
        res.status(500).json({ message: "Error while updating Domain"});
    }
};