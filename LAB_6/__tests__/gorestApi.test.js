const request = require('supertest');

const BASE_URL = 'https://gorest.co.in/public/v2';
const GQL_BASE_URL = 'https://gorest.co.in/public/v2/graphql';
const TOKEN = <YOUR_TOKEN_HERE>;

describe('GoRest API V2 CRUD User Tests', () => {
    let userId;

    it('Сreate a new user', async () => {
        const newUser = {
            name: 'Test User',
            email: `testuser${Math.floor(Math.random() * 10000)}@example.com`,
            gender: 'male',
            status: 'active'
        };

        const response = await request(BASE_URL)
            .post('/users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(newUser)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.email).toBe(newUser.email);

        userId = response.body.id;
    });

    it('Retrieve created user', async () => {
        const response = await request(BASE_URL)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', userId);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });

    it('Update user', async () => {
        const updatedData = {
            name: 'Updated Test User',
            status: 'inactive'
        };

        const response = await request(BASE_URL)
            .put(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.name).toBe(updatedData.name);
        expect(response.body.status).toBe(updatedData.status);
    });

    it('Delete user', async () => {
        await request(BASE_URL)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(204);

        await request(BASE_URL)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(404);
    });
});

describe('GoRest GraphQL API Tests', () => {
    let gQLuserId;

    it('Сreate new user', async () => {
        const mutation = `
      mutation {
        createUser(
          input: {
            name: "GraphQL Test User",
            email: "graphqltestuser${Math.floor(Math.random() * 10000)}@example.com",
            gender: "male",
            status: "active"
          }
        ) {
          user {
            id
            name
            email
            gender
            status
          }
        }
      }
    `;

        const response = await request(GQL_BASE_URL)
            .post('/')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send({ query: mutation })
            .expect(200);

        expect(response.body.data.createUser.user).toHaveProperty('id');
        expect(response.body.data.createUser.user.name).toBe('GraphQL Test User');
        expect(response.body.data.createUser.user.status).toBe('active');

        gQLuserId = response.body.data.createUser.user.id;
        console.log('GQL User ID: ' + gQLuserId);
    });

    it('Retrieve the created user', async () => {
        const query = `
      query {
        user(id: ${gQLuserId}) {
          id
          name
          email
          gender
          status
        }
      }
    `;

        const response = await request(GQL_BASE_URL)
            .post('/')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send({ query })
            .expect(200);

        expect(response.body.data.user).toHaveProperty('id', gQLuserId);
        expect(response.body.data.user).toHaveProperty('name', 'GraphQL Test User');
    });

    it('Update the user status', async () => {
        const mutation = `
      mutation {
        updateUser(
          input: {
            id: ${gQLuserId},
            status: "inactive"
          }
        ) {
          user {
            id
            status
          }
        }
      }
    `;

        const response = await request(GQL_BASE_URL)
            .post('/')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send({ query: mutation })
            .expect(200);

        expect(response.body.data.updateUser.user).toHaveProperty('id', gQLuserId);
        expect(response.body.data.updateUser.user.status).toBe('inactive');
    });

    it('Delete the user', async () => {
        const mutation = `
    mutation {
      deleteUser(input: { id: ${gQLuserId} }) {
        user {
          id
          name
          email
          gender
          status
        }
      }
    }
    `;

        const response = await request(GQL_BASE_URL)
            .post('/')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send({ query: mutation })
            .expect(200);

        expect(response.body.data.deleteUser.user).toHaveProperty('id', gQLuserId);
        expect(response.body.data.deleteUser.user).toHaveProperty('name', 'GraphQL Test User');
        expect(response.body.data.deleteUser.user).toHaveProperty('status', 'inactive');
    });
});