

// const Profile = require("../models/Profile");
// const mongoose = require("mongoose");

// exports.advancedSearchCandidates = async (req, res) => {
//     console.log("==== ADVANCED SEARCH REQUEST ====");
//     console.log("Request Body:", JSON.stringify(req.body, null, 2));
//     console.log("Pagination - Page:", req.query.page || 1, "Limit:", req.query.limit || 10);

//     try {
//         const {
//             keywords,
//             experienceFrom,
//             experienceTo,
//             currentLocation,
//             isRelocatable,
//             salaryFrom,
//             salaryTo,
//             department,
//             role,
//             industry,
//             companyName,
//             designation,
//             noticePeriod,
//             ugQualification,
//             pgQualification,
//             gender,
//             displayDetails,
//             verifiedNumber,
//             verifiedEmail,
//             attachedResume,
//             ageFrom,
//             ageTo
//         } = req.body;



//         // Base query to find profiles (excluding skills for now)
//         let baseQuery = {};

//         // Experience Range Filter
//         const experienceQuery = {};
//         if (experienceFrom) experienceQuery.$gte = parseFloat(experienceFrom);
//         if (experienceTo) experienceQuery.$lte = parseFloat(experienceTo);
//         if (Object.keys(experienceQuery).length > 0) {
//             baseQuery['empProfile.totalExp'] = experienceQuery;
//         }

//         // Current Location Filter
//         if (currentLocation) {
//             baseQuery['personalDetails.address'] = { $regex: currentLocation, $options: 'i' };
//         }

//         // Relocatability Filter
//         if (isRelocatable) {
//             baseQuery['personalDetails.isRelocatable'] = true;
//         }

//         // Salary Range Filter
//         const salaryQuery = {};
//         if (salaryFrom) salaryQuery.$gte = parseFloat(salaryFrom);
//         if (salaryTo) salaryQuery.$lte = parseFloat(salaryTo);
//         if (Object.keys(salaryQuery).length > 0) {
//             baseQuery['empProfile.currentSalary'] = salaryQuery;
//         }

//         // Department Filter
//         if (department) {
//             baseQuery['empProfile.jobProfile'] = { $regex: department, $options: 'i' };
//         }

//         // Role Filter
//         if (role) {
//             baseQuery['empProfile.currentJobTitle'] = { $regex: role, $options: 'i' };
//         }

//         // Industry Filter
//         if (industry) {
//             baseQuery['empProfile.companyName'] = { $regex: industry, $options: 'i' };
//         }

//         // Company Name Filter
//         if (companyName) {
//             baseQuery['empProfile.companyName'] = { $regex: companyName, $options: 'i' };
//         }

//         // Designation Filter
//         if (designation) {
//             baseQuery['empProfile.currentJobTitle'] = { $regex: designation, $options: 'i' };
//         }

//         // Notice Period Filter
//         if (noticePeriod) {
//             baseQuery['empProfile.noticePeriod'] = { $regex: noticePeriod, $options: 'i' };
//         }

//         // Education Qualification Filters
//         if (ugQualification) {
//             baseQuery['educationProfile.education'] = { $regex: ugQualification, $options: 'i' };
//         }

//         if (pgQualification) {
//             baseQuery['educationProfile.courseType'] = { $regex: pgQualification, $options: 'i' };
//         }

//         // Gender Filter
//         if (gender) {
//             baseQuery['personalDetails.gender'] = gender;
//         }

//         // Age Range Filter
//         const ageQuery = {};
//         const currentDate = new Date();
//         if (ageFrom) {
//             const fromDate = new Date(currentDate.getFullYear() - ageFrom, currentDate.getMonth(), currentDate.getDate());
//             ageQuery.$lte = fromDate;
//         }
//         if (ageTo) {
//             const toDate = new Date(currentDate.getFullYear() - ageTo, currentDate.getMonth(), currentDate.getDate());
//             ageQuery.$gte = toDate;
//         }
//         if (Object.keys(ageQuery).length > 0) {
//             baseQuery['personalDetails.dateOfBirth'] = ageQuery;
//         }

//         // Verification Filters
//         if (verifiedNumber) {
//             baseQuery['userData.isNumberVerified'] = true;
//         }
//         if (verifiedEmail) {
//             baseQuery['userData.isEmailVerified'] = true;
//         }
//         if (attachedResume) {
//             baseQuery['userData.resumeAttached'] = true;
//         }

//         // Create a separate skills filter
//         let skillsFilter = {};
//         if (keywords && keywords.length > 0) {
//             skillsFilter = {
//                 $or: keywords.map(keyword => ({
//                     'skillProfile.skillName': { $regex: keyword, $options: 'i' }
//                 }))
//             };
//         }

//         // Pagination
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;
//         const skip = (page - 1) * limit;

//         // console.log("==== QUERY DEBUG ====");
//         // console.log("Base Query:", JSON.stringify(baseQuery, null, 2));
//         // console.log("Skills Filter:", JSON.stringify(skillsFilter, null, 2));

//         // // Debug schema collections
//         // console.log("==== SCHEMA COLLECTIONS CHECK ====");

//         // Check if collections exist
//         const collections = await mongoose.connection.db.listCollections().toArray();
//         const collectionNames = collections.map(c => c.name);

//         // Check expected collections
//         const expectedCollections = ['profiles', 'users', 'empprofileschemas', 'educationschemas', 'personaldetailschemas', 'skillschemas'];
//         for (const coll of expectedCollections) {
//             console.log(`Collection '${coll}' exists:`, collectionNames.includes(coll));
//         }

//         // Sample document from each collection
//         for (const coll of expectedCollections) {
//             if (collectionNames.includes(coll)) {
//                 const sample = await mongoose.connection.db.collection(coll).findOne({});
//                 console.log(`Sample ${coll} document:`, sample ? "Found" : "Not found");
//                 if (sample) {
//                     console.log(`Sample ${coll} fields:`, Object.keys(sample));
//                 }
//             }
//         }

//         // Build the aggregation pipeline
//         const lookupStages = [
//             // User data lookup
//             {
//                 $lookup: {
//                     from: 'users',
//                     localField: 'user',
//                     foreignField: '_id',
//                     as: 'userData'
//                 }
//             },
//             // { $unwind: { path: '$userData', preserveNullAndEmptyArrays: true } },

//             // Employment profile lookup
//             {
//                 $lookup: {
//                     from: 'empprofileschemas',
//                     localField: 'empProfile',
//                     foreignField: '_id',
//                     as: 'empProfile'
//                 }
//             },
//             // { $unwind: { path: '$empProfile', preserveNullAndEmptyArrays: true } },

//             // Education profile lookup
//             {
//                 $lookup: {
//                     from: 'educationschemas',
//                     localField: 'educationProfile',
//                     foreignField: '_id',
//                     as: 'educationProfile'
//                 }
//             },
//             // { $unwind: { path: '$educationProfile', preserveNullAndEmptyArrays: true } },

//             // Personal details lookup
//             {
//                 $lookup: {
//                     from: 'personaldetailschemas',
//                     localField: 'personalDetails',
//                     foreignField: '_id',
//                     as: 'personalDetails'
//                 },


//             },
//              // Step 2: Unwind personalDetails (optional if it's always a single object)
//     {
//         $unwind: {
//             path: "$personalDetails",
//             preserveNullAndEmptyArrays: true // Prevents removal of profiles without personal details
//         }
//     },
//     // Step 3: Now filter by gender
//     {
//         $match: {
//             "gender": "male" 
//         }
//     },
//             // { $unwind: { path: '$personalDetails', preserveNullAndEmptyArrays: true } },

//             // Skills lookup
//             {
//                 $lookup: {
//                     from: 'skillschemas',
//                     localField: 'skillProfile',
//                     foreignField: '_id',
//                     as: 'skillProfile'
//                 }
//             },
//             // { $unwind: { path: '$skillProfile', preserveNullAndEmptyArrays: true } }
//         ];

//         // console.log("lookup stagge profile", lookupStages)
//         async function testQuery() {
//             const step1 = await Profile.aggregate(lookupStages.slice(0, 1));
//             console.log("🔹 After Lookup:", step1.length, "documents found");

//             const step2 = await Profile.aggregate(pipeline.slice(0, 2));
//             console.log("🔹 After Unwind:", step2.length, "documents found");

//             const finalResult = await Profile.aggregate(pipeline);
//             console.log("✅ Final Matched Documents:", finalResult.length);

//             return finalResult;
//         }

//         testQuery();

//         // Debug lookup stages
//         console.log("==== LOOKUP STAGES ====");
//         for (let i = 0; i < lookupStages.length; i += 2) {
//             if (lookupStages[i].$lookup) {
//                 const lookup = lookupStages[i].$lookup;
//                 // console.log(`Lookup from '${lookup.from}' using localField '${lookup.localField}' to foreignField '${lookup.foreignField}'`);
//             }
//         }

//         // Construct the full pipeline
//         let pipeline = [...lookupStages];
//         console.log("===== pipe line ======",pipeline);


//         // Apply base query filters if any exist
//         if (Object.keys(baseQuery).length > 0) {
//             console.log("object keys base query: ",  JSON.stringify(baseQuery)  );
//             pipeline.push({ $match: baseQuery });
//         }

//         // Apply skills filter if keywords were provided
//         if (Object.keys(skillsFilter).length > 0) {
//             pipeline.push({ $match: skillsFilter });
//         }

//         // Check for documents at each pipeline stage
//         // console.log("==== PIPELINE STAGE DEBUGGING ====");

//         // Check initial profiles collection
//         const profileCount = await Profile.countDocuments();
//         console.log(`Initial Profile collection has ${profileCount} documents`);

//         // Debug each stage of the pipeline
//         let stagePipeline = [];
//         for (let i = 0; i < pipeline.length; i++) {
//             stagePipeline.push(pipeline[i]);
//             const stageResult = await Profile.aggregate(stagePipeline);
//             // console.log(`After stage ${i+1}: ${stageResult.length} documents remain`);

//             // If no documents remain, show the last stage that's filtering everything out
//             if (stageResult.length === 0 && i > 0) {
//                 // console.log(`All documents filtered out at stage ${i+1}:`, JSON.stringify(pipeline[i], null, 2));
//                 // console.log("Previous stage had results. This stage is causing the filter to return zero results.");

//                 // If it's a $match stage, we'll test different parts of the match condition
//                 if (pipeline[i].$match) {
//                     console.log("Testing individual match conditions:");
//                     const matchConditions = pipeline[i].$match;

//                     for (const key in matchConditions) {
//                         const singleConditionTest = await Profile.aggregate([
//                             ...stagePipeline.slice(0, i),
//                             { $match: { [key]: matchConditions[key] } }
//                         ]);
//                         // console.log(`- Condition '${key}': ${singleConditionTest.length} results`);
//                     }
//                 }
//                 break;
//             }

//             // Sample document at this stage
//             if (stageResult.length > 0) {
//                 console.log(`Sample document keys after stage ${i+1}:`, Object.keys(stageResult[0]));
//             }
//         }

//         // Add projection, skip, and limit stages
//         pipeline = [
//             ...pipeline,
//             { 
//                 $project: {
//                     candidateId: '$_id',
//                     fullName: '$personalDetails.fullName',
//                     email: '$userData.email',
//                     phone: '$userData.phone',
//                     profilePicture: '$userData.profilePicture',
//                     skills: {
//                         $ifNull: ['$skillProfile.skill', []]
//                     },
//                     currentJobTitle: '$empProfile.currentJobTitle',
//                     currentCompany: '$empProfile.companyName',
//                     experience: '$empProfile.experience',
//                     currentSalary: '$empProfile.currentSalary',
//                     noticePeriod: '$empProfile.noticePeriod',
//                     education: {
//                         degree: '$educationProfile.education',
//                         institution: '$educationProfile.institutionName',
//                         graduationYear: '$educationProfile.duration'
//                     },
//                     location: '$personalDetails.address',
//                     gender: '$personalDetails.gender',
//                     dateOfBirth: '$personalDetails.dateOfBirth',
//                     isRelocatable: '$personalDetails.isRelocatable',
//                     verificationStatus: {
//                         emailVerified: '$userData.isEmailVerified',
//                         phoneVerified: '$userData.isNumberVerified',
//                         resumeAttached: '$userData.resumeAttached'
//                     }
//                 }
//             },
//             { $skip: skip },
//             { $limit: 5 }
//         ];

//         // Execute the candidates query
//         // console.log("==== EXECUTING FINAL QUERY ====");
//         const candidates = await Profile.aggregate(pipeline);
//         // console.log(`Found ${candidates.length} candidates after full pipeline execution`);

//         // Check field presence in results
//         if (candidates.length > 0) {
//             const firstCandidate = candidates[0];
//             // console.log("==== CHECKING RESULT FIELDS ====");
//             const checkField = (field, path) => {
//                 const value = path.split('.').reduce((obj, key) => obj && obj[key], firstCandidate);
//                 // console.log(`Field '${field}': ${value !== undefined ? 'Present' : 'Missing'}`);
//             };

//             checkField('Full Name', 'fullName');
//             checkField('Email', 'email');
//             checkField('Phone', 'phone');
//             checkField('Current Job', 'currentJobTitle');
//             checkField('Company', 'currentCompany');
//             checkField('Experience', 'experience');
//             checkField('Salary', 'currentSalary');
//             checkField('Notice Period', 'noticePeriod');
//             checkField('Education Degree', 'education.degree');
//             checkField('Location', 'location');
//             checkField('Skills', 'skills');
//         }

//         // Construct total count pipeline (same filters without projection, skip, limit)
//         const countPipeline = [...lookupStages];

//         if (Object.keys(baseQuery).length > 0) {
//             countPipeline.push({ $match: baseQuery });
//         }

//         if (Object.keys(skillsFilter).length > 0) {
//             countPipeline.push({ $match: skillsFilter });
//         }

//         countPipeline.push({ $count: 'total' });

//         // Execute the count query
//         // console.log("==== EXECUTING COUNT QUERY ====");
//         const totalCandidatesResult = await Profile.aggregate(countPipeline);
//         const totalCandidates = totalCandidatesResult[0] ? totalCandidatesResult[0].total : 0;
//         // console.log(`Total candidates count: ${totalCandidates}`);

//         // console.log("==== RESPONSE PREPARATION ====");
//         console.log("Sample candidate (if any):", candidates.length > 0 ? 
//             `ID: ${candidates[0].candidateId}, Name: ${candidates[0].fullName}` : 
//             "No candidates found");

//         return res.status(200).json({
//             success: true,
//             message: "Candidates found successfully",
//             data: candidates,
//             total: totalCandidates,
//             page,
//             limit,
//             totalPages: Math.ceil(totalCandidates / limit)
//         });

//     } catch (error) {
//         console.error("==== ADVANCED SEARCH ERROR ====");
//         console.error("Error type:", error.name);
//         console.error("Error message:", error.message);
//         console.error("Stack trace:", error.stack);

//         // Check for MongoDB connection issues
//         if (error.name === 'MongoError' || error.name === 'MongoServerError') {
//             console.error("MongoDB Error Code:", error.code);
//         }

//         return res.status(500).json({
//             success: false,
//             message: "Error in advanced search",
//             error: error.message
//         });
//     }
// };


const Profile = require("../models/Profile");
const User = require("../models/User");
const Skill = require("../models/ExtraProfile/skillProfile");

exports.advancedSearchCandidates = async (req, res) => {
    try {
        const {
            keywords,
            experienceFrom,
            experienceTo,
            currentLocation,
            salaryFrom,
            salaryTo,
            department,
            role,
            industry,
            companyName,
            designation,
            noticePeriod,
            ugQualification,
            pgQualification,
            gender,
            displayDetails,
            verifiedNumber,
            verifiedEmail,
            attachedResume,
            ageFrom,
            ageTo,
            isRelocatable,
            page = 1,
            limit = 10
        } = req.body;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        console.log("Request Body:", req.body);

        let queryConditions = [{ role: "jobseeker" }];

        let matchedSkills;

        // ✅ Skill Filtering - FIXED with proper ObjectId handling
        if (keywords && Array.isArray(keywords) && keywords.length > 0) {
            // First find skills by name
             matchedSkills = await Skill.find({ skillName: { $in: keywords.map(k => new RegExp(k, 'i')) } });
            console.log("Matched Skills:", matchedSkills);
            
            if (matchedSkills.length > 0) {
                const skillIds = matchedSkills.map(skill => skill._id);
                
                // CRITICAL FIX: Convert string IDs to proper MongoDB ObjectIds
                const mongoose = require('mongoose');
                const objectIdSkillIds = skillIds.map(id =>new  mongoose.Types.ObjectId(id));
                
                console.log("Looking for profiles with these skill IDs:", objectIdSkillIds);
                
                // Use proper aggregation to look for users with matching skills
                // This query uses an aggregation pipeline to first lookup and populate the user's profile
                // and then checks if any of the skill IDs match those in the user's skillsProfile
                
                // For a direct find query approach:
                queryConditions.push({
                    "profile": { $exists: true }
                });
                
                // Now check if the profile has any of the matched skill IDs
                // We look inside the populated documents for the skill objects
                queryConditions.push({
                    $or: [
                        { "profile.skillsProfile": { $elemMatch: { $in: objectIdSkillIds } } }
                    ]
                });
            }
        }

        // ✅ Relocatable filter (previously unused but in request body)
        if (isRelocatable !== undefined) {
            queryConditions.push({ "profile.isRelocatable": isRelocatable });
        }

        // Rest of your filters remain the same
        if (currentLocation) queryConditions.push({ "profile.location": currentLocation });
        if (department) queryConditions.push({ "profile.employProfile.department": department });
        if (role) queryConditions.push({ "profile.employProfile.currentJobTitle": role });
        if (industry) queryConditions.push({ "profile.employProfile.industry": industry });
        if (companyName) queryConditions.push({ "profile.employProfile.companyName": companyName });
        if (designation) queryConditions.push({ "profile.employProfile.currentJobTitle": designation });
        if (noticePeriod) queryConditions.push({ "profile.employProfile.noticePeriod": noticePeriod });
        if (gender) queryConditions.push({ "profile.personalDetails.gender": gender });

        // ✅ Salary Filter
        if (salaryFrom || salaryTo) {
            queryConditions.push({
                "profile.employProfile.currentSalary": {
                    ...(salaryFrom ? { $gte: parseInt(salaryFrom) } : {}),
                    ...(salaryTo ? { $lte: parseInt(salaryTo) } : {})
                }
            });
        }

        // ✅ Experience Filter
        if (experienceFrom || experienceTo) {
            queryConditions.push({
                "profile.employProfile.totalExp": {
                    ...(experienceFrom ? { $gte: parseInt(experienceFrom) } : {}),
                    ...(experienceTo ? { $lte: parseInt(experienceTo) } : {})
                }
            });
        }

        // ✅ Education Filters
        if (ugQualification) {
            queryConditions.push({
                "profile.educationProfile": {
                    $elemMatch: { education: "Graduation", courseName: ugQualification }
                }
            });
        }
        if (pgQualification) {
            queryConditions.push({
                "profile.educationProfile": {
                    $elemMatch: { education: "Post-graduation", courseName: pgQualification }
                }
            });
        }

        // ✅ Age Filter
        if (ageFrom || ageTo) {
            let dobQuery = {};
            if (ageFrom) dobQuery.$lte = new Date(new Date().setFullYear(new Date().getFullYear() - ageFrom));
            if (ageTo) dobQuery.$gte = new Date(new Date().setFullYear(new Date().getFullYear() - ageTo));
            queryConditions.push({ "profile.personalDetails.dateOfBirth": dobQuery });
        }

        // ✅ Verified Filters
        if (verifiedNumber) queryConditions.push({ "profile.contactNumber": { $exists: true, $ne: null } });
        if (verifiedEmail) queryConditions.push({ "email": { $exists: true, $ne: null } });
        if (attachedResume) queryConditions.push({ "profile.resume": { $exists: true, $ne: null } });

        console.log("MongoDB Query Conditions:", JSON.stringify(queryConditions, null, 2));

        // Only enforce filter requirement if not just looking for jobseekers
        if (queryConditions.length <= 1 && Object.keys(req.body).length > 0) {
            return res.status(400).json({ success: false, message: "No valid filters provided" });
        }

        const query = { $and: queryConditions };

        // Debug the final query
        console.log("Final query:", JSON.stringify(query, null, 2));

        // ✅ Alternative approach: Two-step lookup for complex nested fields
        // First find all users with the right role
        const jobseekers = await User.find({ role: "jobseeker" }).select('_id profile');
        console.log(`Found ${jobseekers.length} total jobseekers`);
        
        // Then populate their profiles and filter manually
        const populatedUsers = await User.find({ _id: { $in: jobseekers.map(u => u._id) } })
            .populate({
                path: "profile",
                model: "Profile",  // Ensure proper model name
                populate: [
                    { path: "skillsProfile", model: "skillSchema" },  // Use correct model names
                    { path: "personalDetails", model: "personalDetailSchema" },
                    { path: "educationProfile" },
                    { path: "employProfile" }
                ]
            })
            .lean();
        
        console.log(`Populated ${populatedUsers.length} user profiles`);
        
        // Filter users who have any of the matching skills (post-populate filtering)
        let filteredUsers = populatedUsers;
        if (matchedSkills && matchedSkills.length > 0) {
            const skillIdsToMatch = matchedSkills.map(skill => skill._id.toString());
            filteredUsers = populatedUsers.filter(user => {
                // Skip users without a profile or skills
                if (!user.profile || !user.profile.skillsProfile) return false;
                
                // Check if any of the user's skills match our target skills
                const userSkillIds = user.profile.skillsProfile.map(skill => 
                    skill._id ? skill._id.toString() : null
                ).filter(id => id !== null);
                
                console.log(`User ${user._id} has skills: ${userSkillIds}`);
                return userSkillIds.some(id => skillIdsToMatch.includes(id));
            });
        }

        
        console.log(`Found ${filteredUsers.length} users with matching skills`);

        // Apply pagination to filtered results
        const paginatedResults = filteredUsers.slice(skip, skip + limitNum);

        res.status(200).json({
            success: true,
            total: filteredUsers.length,
            page: pageNum,
            limit: limitNum,
            data: paginatedResults
        });

    } catch (error) {
        console.error("Advanced Search Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};









