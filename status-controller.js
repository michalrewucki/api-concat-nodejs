import statusService from "./status-service.js";

async function getCityStatus(req, res, next) {
    const cityName = req.params.cityName;
    const response = await statusService.getCityStatus(cityName);
    res.send(JSON.stringify(response))
}

export default { getCityStatus };
