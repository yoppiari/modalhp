import { ref, computed } from 'vue';
import { db } from '../db';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

export function useBusinessProfile() {
    // We observe the settings table for the 'business_profile' key
    const profileSetting = useObservable(
        liveQuery(() => db.settings.get('business_profile'))
    ) || ref(null);

    // Default empty profile
    const emptyProfile = {
        businessName: '',
        address: '',
        phone: '',
        ownerName: ''
    };

    // Computed property to always return an object, merging saved data with defaults
    const businessProfile = computed(() => {
        if (profileSetting.value && profileSetting.value.value) {
            return { ...emptyProfile, ...profileSetting.value.value };
        }
        return { ...emptyProfile };
    });

    // Helper to check if a profile is set (at least business name exists)
    const hasProfile = computed(() => {
        return !!businessProfile.value.businessName;
    });

    // Function to save the profile to the database
    const saveProfile = async (profileData) => {
        try {
            await db.settings.put({
                key: 'business_profile',
                value: { ...profileData }
            });
            return true;
        } catch (error) {
            console.error('Failed to save business profile:', error);
            return false;
        }
    };

    return {
        businessProfile,
        hasProfile,
        saveProfile
    };
}
