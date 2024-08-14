const units = {
    mass: ["miligrama", "grama", "quilograma", "on�a", "libra"],
    volume: ["mililitro", "metro c�bico", "litro"],
    fuel: ["litro", "gal�o"],
    speed: ["kmh", "mph", "ms"],
    data: ["bit", "byte", "kilobyte", "megabyte", "gigabyte", "terabyte"],
    length: ["pic�metro", "nan�metro", "micr�metro", "mil�metro", "metro", "p�", "jarda", "polegada", "quil�metro"],
    temperature: ["Celsius", "Fahrenheit", "Kelvin"],
    time: ["milissegundos", "segundos", "minutos", "horas", "dias", "semanas", "meses", "anos", "d�cadas", "s�culos"]
};

function populateUnits() {
    const measureType = document.getElementById('measureType').value;
    const unitFrom = document.getElementById('unitFrom');
    const unitTo = document.getElementById('unitTo');

    unitFrom.innerHTML = "";
    unitTo.innerHTML = "";

    if (measureType) {
        units[measureType].forEach(unit => {
            const optionFrom = document.createElement('option');
            const optionTo = document.createElement('option');
            optionFrom.value = unit;
            optionFrom.textContent = unit;
            optionTo.value = unit;
            optionTo.textContent = unit;
            unitFrom.appendChild(optionFrom);
            unitTo.appendChild(optionTo);
        });
    }
}

function convert() {
    const measureType = document.getElementById('measureType').value;
    const unitFrom = document.getElementById('unitFrom').value;
    const unitTo = document.getElementById('unitTo').value;
    const value = parseFloat(document.getElementById('value').value);
    let result;

    if (!measureType || !unitFrom || !unitTo || isNaN(value)) {
        document.getElementById('result').textContent = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    switch (measureType) {
        case 'mass':
            result = convertMass(unitFrom, unitTo, value);
            break;
        case 'volume':
            result = convertVolume(unitFrom, unitTo, value);
            break;
        case 'fuel':
            result = convertFuel(unitFrom, unitTo, value);
            break;
        case 'speed':
            result = convertSpeed(unitFrom, unitTo, value);
            break;
        case 'data':
            result = convertData(unitFrom, unitTo, value);
            break;
        case 'length':
            result = convertLength(unitFrom, unitTo, value);
            break;
        case 'temperature':
            result = convertTemperature(unitFrom, unitTo, value);
            break;
        case 'time':
            result = convertTime(unitFrom, unitTo, value);
            break;
        default:
            result = "Convers�o n�o suportada.";
    }

    document.getElementById('result').textContent = `${value} ${unitFrom} = ${result} ${unitTo}`;
}

function convertMass(from, to, value) {
    const conversions = {
        miligrama: { grama: 0.001, quilograma: 1e-6, on�a: 3.5274e-5, libra: 2.2046e-6 },
        grama: { miligrama: 1000, quilograma: 0.001, on�a: 0.035274, libra: 0.00220462 },
        quilograma: { miligrama: 1e6, grama: 1000, on�a: 35.274, libra: 2.20462 },
        on�a: { miligrama: 28349.5, grama: 28.3495, quilograma: 0.0283495, libra: 0.0625 },
        libra: { miligrama: 453592, grama: 453.592, quilograma: 0.453592, on�a: 16 }
    };
    return value * (conversions[from][to] || 1);
}

function convertVolume(from, to, value) {
    const conversions = {
        mililitro: { 'metro c�bico': 1e-6, litro: 0.001 },
        'metro c�bico': { mililitro: 1e6, litro: 1000 },
        litro: { mililitro: 1000, 'metro c�bico': 0.001 }
    };
    return value * (conversions[from][to] || 1);
}

function convertFuel(from, to, value) {
    const conversions = {
        litro: { gal�o: 0.264172 },
        gal�o: { litro: 3.78541 }
    };
    return value * (conversions[from][to] || 1);
}

function convertSpeed(from, to, value) {
    const conversions = {
        kmh: { mph: 0.621371, ms: 0.277778 },
        mph: { kmh: 1.60934, ms: 0.44704 },
        ms: { kmh: 3.6, mph: 2.23694 }
    };
    return value * (conversions[from][to] || 1);
}

function convertData(from, to, value) {
    const conversions = {
        bit: { byte: 0.125, kilobyte: 1.25e-4, megabyte: 1.25e-7, gigabyte: 1.25e-10, terabyte: 1.25e-13 },
        byte: { bit: 8, kilobyte: 0.001, megabyte: 1e-6, gigabyte: 1e-9, terabyte: 1e-12 },
        kilobyte: { bit: 8000, byte: 1000, megabyte: 0.001, gigabyte: 1e-6, terabyte: 1e-9 },
        megabyte: { bit: 8e6, byte: 1e6, kilobyte: 1000, gigabyte: 0.001, terabyte: 1e-6 },
        gigabyte: { bit: 8e9, byte: 1e9, kilobyte: 1e6, megabyte: 1000, terabyte: 0.001 },
        terabyte: { bit: 8e12, byte: 1e12, kilobyte: 1e9, megabyte: 1e6, gigabyte: 1000 }
    };
    return value * (conversions[from][to] || 1);
}

function convertLength(from, to, value) {
    const conversions = {
        pic�metro: { nan�metro: 0.001, micr�metro: 1e-6, mil�metro: 1e-9, metro: 1e-12, p�: 3.2808e-12, jarda: 1.0936e-12, polegada: 3.937e-11, quil�metro: 1e-15 },
        nan�metro: { pic�metro: 1000, micr�metro: 0.001, mil�metro: 1e-6, metro: 1e-9, p�: 3.2808e-9, jarda: 1.0936e-9, polegada: 3.937e-8, quil�metro: 1e-12 },
        micr�metro: { pic�metro: 1e6, nan�metro: 1000, mil�metro: 0.001, metro: 1e-6, p�: 3.2808e-6, jarda: 1.0936e-6, polegada: 3.937e-5, quil�metro: 1e-9 },
        mil�metro: { pic�metro: 1e9, nan�metro: 1e6, micr�metro: 1000, metro: 0.001, p�: 0.00328084, jarda: 0.00109361, polegada: 0.0393701, quil�metro: 1e-6 },
        metro: { pic�metro: 1e12, nan�metro: 1e9, micr�metro: 1e6, mil�metro: 1000, p�: 3.28084, jarda: 1.09361, polegada: 39.3701, quil�metro: 0.001 },
        p�: { pic�metro: 3.048e11, nan�metro: 3.048e8, micr�metro: 3.048e5, mil�metro: 304.8, metro: 0.3048, jarda: 0.333333, polegada: 12, quil�metro: 0.0003048 },
        jarda: { pic�metro: 9.144e11, nan�metro: 9.144e8, micr�metro: 9.144e5, mil�metro: 914.4, metro: 0.9144, p�: 3, polegada: 36, quil�metro: 0.0009144 },
        polegada: { pic�metro: 2.54e10, nan�metro: 2.54e7, micr�metro: 25400, mil�metro: 25.4, metro: 0.0254, p�: 0.0833333, jarda: 0.0277778, quil�metro: 2.54e-5 },
        quil�metro: { pic�metro: 1e15, nan�metro: 1e12, micr�metro: 1e9, mil�metro: 1e6, metro: 1000, p�: 3280.84, jarda: 1093.61, polegada: 39370.1 }
    };
    return value * (conversions[from][to] || 1);
}

function convertTemperature(from, to, value) {
    let result;
    if (from === "Celsius") {
        if (to === "Fahrenheit") result = value * 9/5 + 32;
        else if (to === "Kelvin") result = value + 273.15;
        else result = value;
    } else if (from === "Fahrenheit") {
        if (to === "Celsius") result = (value - 32) * 5/9;
        else if (to === "Kelvin") result = (value - 32) * 5/9 + 273.15;
        else result = value;
    } else if (from === "Kelvin") {
        if (to === "Celsius") result = value - 273.15;
        else if (to === "Fahrenheit") result = (value - 273.15) * 9/5 + 32;
        else result = value;
    }
    return result;
}

function convertTime(from, to, value) {
    const conversions = {
        milissegundos: { segundos: 0.001, minutos: 1.6667e-5, horas: 2.7778e-7, dias: 1.1574e-8, semanas: 1.6534e-9, meses: 3.8052e-10, anos: 3.171e-11, d�cadas: 3.171e-12, s�culos: 3.171e-13 },
        segundos: { milissegundos: 1000, minutos: 0.0166667, horas: 0.000277778, dias: 1.1574e-5, semanas: 1.6534e-6, meses: 3.8052e-7, anos: 3.171e-8, d�cadas: 3.171e-9, s�culos: 3.171e-10 },
        minutos: { milissegundos: 60000, segundos: 60, horas: 0.0166667, dias: 0.000694444, semanas: 9.9206e-5, meses: 2.2831e-5, anos: 1.9013e-6, d�cadas: 1.9013e-7, s�culos: 1.9013e-8 },
        horas: { milissegundos: 3.6e6, segundos: 3600, minutos: 60, dias: 0.0416667, semanas: 0.00595238, meses: 0.00136986, anos: 0.000114155, d�cadas: 1.1416e-5, s�culos: 1.1416e-6 },
        dias: { milissegundos: 8.64e7, segundos: 86400, minutos: 1440, horas: 24, semanas: 0.142857, meses: 0.0328767, anos: 0.00273973, d�cadas: 0.000273973, s�culos: 2.7397e-5 },
        semanas: { milissegundos: 6.048e8, segundos: 604800, minutos: 10080, horas: 168, dias: 7, meses: 0.230137, anos: 0.0191781, d�cadas: 0.00191781, s�culos: 0.000191781 },
        meses: { milissegundos: 2.63e9, segundos: 2.63e6, minutos: 43800, horas: 730.001, dias: 30.4167, semanas: 4.34524, anos: 0.0833334, d�cadas: 0.00833334, s�culos: 0.000833334 },
        anos: { milissegundos: 3.156e10, segundos: 3.156e7, minutos: 525600, horas: 8760, dias: 365, semanas: 52.1429, meses: 12, d�cadas: 0.1, s�culos: 0.01 },
        d�cadas: { milissegundos: 3.156e11, segundos: 3.156e8, minutos: 5.256e6, horas: 87600, dias: 3650, semanas: 521.429, meses: 120, anos: 10, s�culos: 0.1 },
        s�culos: { milissegundos: 3.156e12, segundos: 3.156e9, minutos: 5.256e7, horas: 876000, dias: 36500, semanas: 5214.29, meses: 1200, anos: 100, d�cadas: 10 }
    };
    return value * (conversions[from][to] || 1);
}
