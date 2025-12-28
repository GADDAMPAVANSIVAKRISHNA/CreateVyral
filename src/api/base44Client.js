export const base44 = {
    auth: {
        isAuthenticated: async () => {
            const user = localStorage.getItem('user');
            return !!user;
        },
        me: async () => {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        },
        logout: async () => {
            localStorage.removeItem('user');
            window.location.reload();
        },
        login: async (email) => {
            // Mock login
            const user = { email, full_name: 'Test User' };
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
    },
    entities: {
        Creator: {
            create: async (data) => console.log('Create creator', data),
            list: async () => [],
        },
        Influencer: {
            create: async (data) => console.log('Create influencer', data),
            list: async () => [],
        }
    },
    integrations: {
        Core: {
            UploadFile: async () => 'https://via.placeholder.com/150',
            InvokeLLM: async () => "I am FusionBot.",
        }
    }
};
