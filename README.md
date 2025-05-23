# Full Stack App – Docker, Testing & NGINX Routing

A minimal full stack authentication project featuring **Login**, **Signup**, and a **Dashboard**, built as a learning platform to practice and implement:

- 🔐 Authentication (JWT)
- 🐳 Docker-based containerization
- 🔁 NGINX reverse proxy setup
- ✅ Testing with Jest
- 🔄 CI/CD integration with Travis CI
- ☁️ Deployment to Docker Hub

---

## 🔍 Project Highlights

This simple project contains:

- **Login Page** – Allows users to authenticate
- **Signup Page** – New user registration
- **Dashboard** – Basic protected page post-login

---

## 🚀 What I Learned

Despite the minimal functionality, this project helped me dive deep into:

| Skill               | What I Practiced                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| 🐳 **Docker**       | Writing Dockerfiles for backend and frontend, using `docker-compose`, and publishing to Docker Hub |
| 🔁 **NGINX**        | Configuring reverse proxy to route `/api` to backend and serve frontend build                      |
| ✅ **Jest Testing** | Writing backend unit tests and integrating them into CI pipelines                                  |
| 🔄 **Travis CI**    | Setting up automated builds, tests, and Docker image deployment on every push                      |

---

## 🛠️ Tech Stack

- **Frontend**: React + Ant Design (Login, Signup, Dashboard)
- **Backend**: Node.js + Express + JWT Authentication
- **Database**: MongoDB Atlas
- **Testing**: Jest (Backend)
- **Proxy**: NGINX
- **CI/CD**: Travis CI
- **Containerization**: Docker

---

## 🧱 Project Structure

├── backend/ # Express API (login/signup logic)
│ └── Dockerfile
├── frontend/ # React UI (login, signup, dashboard)
│ └── Dockerfile
├── nginx/ # NGINX reverse proxy config
│ └── default.conf
├── docker-compose.yml
├── .travis.yml

---

## 🐳 Run with Docker

```bash
# Build images
docker-compose build

# Start services
docker-compose up
```

# Run backend tests (Jest)

docker run asad7860/fullstack-backend npm run test

## 🔄 CI/CD with Travis CI

Every push triggers:

- ✅ Backend testing using Jest
- 🐳 Docker image build
- 🚀 Push to Docker Hub (`asad7860/fullstack-backend` and `asad7860/fullstack-frontend`)

### 🛠️ Travis CI Environment Variables

Set the following in your Travis CI project settings:

```bash
DOCKER_USERNAME=<your_dockerhub_username>
DOCKER_PASSWORD=<your_dockerhub_password_or_token>
```

---

## 📦 Docker Hub Repositories

- [`asad7860/fullstack-frontend`](https://hub.docker.com/r/asad7860/fullstack-frontend)
- [`asad7860/fullstack-backend`](https://hub.docker.com/r/asad7860/fullstack-backend)

---

## 👨‍💻 Author

**Asad Moinuddin**
Student, VIT University
GitHub: [asad7860](https://github.com/asad7860)

---

## 📄 License

MIT License

```

Let me know if you'd like this written into a downloadable `README.md` file or want badges added (like Docker Hub pull count, Travis build status, etc.).
```
