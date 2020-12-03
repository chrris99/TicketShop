import axios from 'axios'

const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        // Call has been made from the server side
    
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
    }

    else {
        // Call has been made from the client side
        return axios.create({
            baseUrl: '/'
        })
    }
}

export default buildClient