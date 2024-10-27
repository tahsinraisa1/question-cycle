# Express.js Load Balancing Example

This is a simple Express.js backend application demonstrating load balancing using Nginx. The application consists of two separate Express servers that respond to HTTP requests, and Nginx is configured to distribute incoming requests between them.


## Requirements

- Node.js (version X.X.X)
- Nginx (installed on your local machine)

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd QuestionCycleSystem

2. RUN npm i
3. RUN tsc
4. RUN npm start

## Load balancer 
- implemented by Nginx - nginx/index.conf


## Notes
- Make sure that your firewall allows traffic on port 80.
- You can modify the server_name in the Nginx configuration file to match your local environment.
- Consider using a domain name instead of an IP address and configure SSL for secure connections.

## Future Improvements
- Caching layer can be implemented for user questions fetch
- Endpoint throttling option can be added