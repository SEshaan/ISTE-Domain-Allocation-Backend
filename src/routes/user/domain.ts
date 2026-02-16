import mongoose from "mongoose";
import type {Request, Response} from "express";
import { Domain } from "../../models/domain.js";
import { User } from "../../models/user.js";

export const getAllDomains = async (req: Request, res: Response) => {
    try {
        const domains = await Domain.find();
        res.status(200).json({message: "Domains fetched successfully", data: domains});
    } catch (error) {
        console.error("Error fetching domains:\n", error);
        res.status(500).json({ message: "Error while fetching domains" });
    }
}

export const getDomain = async (req: Request<{domainId: string}>, res: Response) => {
    try {
        const { domainId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(domainId)) {
            return res.status(400).json({ message: "Invalid domain ID" });
        }

        const domain = await Domain.findById(domainId);
        if (!domain) {
            return res.status(404).json({message: "Domain not found"});
        }
        res.status(200).json({message: "Domain fetched successfully", data: domain});
    } catch (error) {
        console.error("Error fetching domain:\n", error);
        res.status(500).json({ message: "Error while fetching domain" });
    }
}

export const applyForDomain = async (req: Request, res: Response) => {
    try {
        const { domainId } = req.body;
        if (!domainId) {
            return res.status(400).json({ message: "Domain ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(domainId)) {
            return res.status(400).json({ message: "Invalid domain ID" });
        }
        
        const domain = await Domain.findById(domainId);
        if (!domain) {
            return res.status(404).json({message: "Domain not found"});
        }

        const userEmail = req.user?.email;
        if (!userEmail) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findOneAndUpdate(
            {
                email: userEmail,
                $expr: { $lt: [{ $size: "$selectedDomainIds" }, 2] } // Only update if less than 2 domains
            },
            { $addToSet: { selectedDomainIds: domainId } },
            { new: true, runValidators: true }
        );

        if (!user) {
            const existingUser = await User.findOne({ email: userEmail });
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            } else {
                return res.status(400).json({ message: "You have already applied for 2 domains" });
            }
        }

        res.status(200).json({message: "Domain applied successfully", data: { domain, user }});
    } catch (error: any) {
        console.error("Error applying for domain:\n", error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({message: "Cannot apply for domain. You may have already applied or reached the maximum limit."});
        }
        
        res.status(500).json({message: "Error while applying for domain"});
    }
}

export const removeDomainApplication = async (req: Request, res: Response) => {
    try {
        const { domainId } = req.body;
        if (!domainId) {
            return res.status(400).json({ message: "Domain ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(domainId)) {
            return res.status(400).json({ message: "Invalid domain ID" });
        }

        const domain = await Domain.findById(domainId);
        if (!domain) {
            return res.status(404).json({ message: "Domain not found" });
        }

        const userEmail = req.user?.email;
        if (!userEmail) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Remove only if the user has previously applied for this domain
        const user = await User.findOneAndUpdate(
            { email: userEmail, selectedDomainIds: domainId },
            { $pull: { selectedDomainIds: domainId } },
            { new: true, runValidators: true }
        );

        if (!user) {
            // determine whether the user doesn't exist or simply didn't apply
            const existingUser = await User.findOne({ email: userEmail });
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(400).json({ message: "You have not applied for this domain" });
        }
        console.log("Domain application removed successfully:\n", { domain, user });
        res.status(200).json({ message: "Domain application removed successfully", data: { domain, user } });
    } catch (error: any) {
        console.error("Error removing domain application:\n", error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Cannot remove domain application." });
        }

        res.status(500).json({ message: "Error while removing domain application" });
    }
}