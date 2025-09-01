import { DataSource } from 'typeorm';
import { dbConfig } from '../../dbConfig';
import { User, Role } from '../entities/user.entity';
import { Profile, Gender } from '../entities/profile.entity';
import * as bcrypt from 'bcrypt';

async function createAdminUser() {
  // Initialize database connection
  const dataSource = new DataSource(dbConfig);
  
  try {
    await dataSource.initialize();
    console.log('Database connection established');

    const userRepository = dataSource.getRepository(User);
    const profileRepository = dataSource.getRepository(Profile);

    // Check if admin already exists
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@engage.com' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists with email: admin@engage.com');
      return;
    }

    // Create profile for admin
    const adminProfile = new Profile();
    adminProfile.bio = 'System Administrator with full access to all features';
    adminProfile.gender = Gender.MALE;
    adminProfile.dateOfbirth = new Date('1990-01-01');
    adminProfile.profilePicture = 'https://via.placeholder.com/150/007bff/ffffff?text=Admin';

    const savedProfile = await profileRepository.save(adminProfile);
    console.log('Admin profile created');

    // Create admin user
    const adminUser = new User();
    adminUser.firstName = 'System';
    adminUser.lastName = 'Administrator';
    adminUser.middleName = 'Admin';
    adminUser.email = 'admin@engage.com';
    adminUser.phone = '+233 24 123 4567';
    adminUser.address = '123 Admin Street';
    adminUser.city = 'Accra';
    adminUser.region = 'Greater Accra';
    adminUser.role = Role.ADMIN;
    adminUser.password = 'admin123'; // This will be hashed by the BeforeInsert hook
    adminUser.profile = savedProfile;

    const savedAdmin = await userRepository.save(adminUser);
    console.log('Admin user created successfully!');
    console.log('Email: admin@engage.com');
    console.log('Password: admin123');
    console.log('User ID:', savedAdmin.id);

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await dataSource.destroy();
    console.log('Database connection closed');
  }
}

// Run the script
createAdminUser()
  .then(() => {
    console.log('Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
