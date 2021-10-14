import statusService from "./status-service.js";

async function getCityStatus(req, res, next) {
    const cityName = req.params.cityName;
    try {
        const response = await statusService.getCityStatus(cityName);
        res.send(JSON.stringify(response))
    } catch (error) {
        res.status(500);
        res.send(JSON.stringify(error.message));
    }
}

export default { getCityStatus };
