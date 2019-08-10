class GitHub {
    constructor() {
        this.client_id = 'ea29b0fbd9c62bb40ea5';
        this.client_secret = '4f5d926c7f98ecb731cbb30eccba7044c0fe2918';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        
        const profile = await profileResponse.json();

        return {
            profile
        }
    }
}