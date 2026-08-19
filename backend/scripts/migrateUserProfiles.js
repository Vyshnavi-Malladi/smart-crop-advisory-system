const mongoose = require('mongoose');
const User = require('../models/User');
const FarmerProfile = require('../models/FarmerProfile');

// Run this script once to update existing users
const migrateUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'your_mongodb_connection_string_here');

        console.log('🔄 Starting migration...');

        // Find all farmer profiles with profileCompleted = true
        const farmerProfiles = await FarmerProfile.find({ profileCompleted: true });
        const userIds = farmerProfiles.map(p => p.user);

        // Update all users who have complete farmer profiles
        const result = await User.updateMany(
            { _id: { $in: userIds } },
            { hasCompletedProfile: true }
        );

        console.log(`✅ Updated ${result.modifiedCount} users with completed profiles`);
        console.log(`📊 Total users with complete profiles: ${userIds.length}`);
        
        // Also check for users with profiles that might not have profileCompleted flag
        const allFarmerProfiles = await FarmerProfile.find({});
        const allUserIds = allFarmerProfiles.map(p => p.user);
        
        // Update any user who has a profile but might not have the flag
        const result2 = await User.updateMany(
            { 
                _id: { $in: allUserIds },
                hasCompletedProfile: false
            },
            { hasCompletedProfile: true }
        );
        
        console.log(`✅ Updated ${result2.modifiedCount} additional users with profiles (without completed flag)`);
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from database');
    }
};

// Check if running directly
if (require.main === module) {
    // Load environment variables
    require('dotenv').config();
    migrateUsers();
}

module.exports = migrateUsers;