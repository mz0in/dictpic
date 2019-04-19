const expect = require('chai').expect;

const timeUtils = require('../lib/timeIntervals');
const util = require('../lib/util');

describe('isLeapYear()', function () {
    it('returns true if year is a leap year, false otherwise', function () {

        const leapYears1800To2404 = [
            1804, 1808, 1812, 1816, 1820, 1824, 1828, 1832, 1836, 1840, 1844,
            1848, 1852, 1856, 1860, 1864, 1868, 1872, 1876, 1880, 1884, 1888,
            1892, 1896, 1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936,
            1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980,
            1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024,
            2028, 2032, 2036, 2040, 2044, 2048, 2052, 2056, 2060, 2064, 2068,
            2072, 2076, 2080, 2084, 2088, 2092, 2096, 2104, 2108, 2112, 2116,
            2120, 2124, 2128, 2132, 2136, 2140, 2144, 2148, 2152, 2156, 2160,
            2164, 2168, 2172, 2176, 2180, 2184, 2188, 2192, 2196, 2204, 2208,
            2212, 2216, 2220, 2224, 2228, 2232, 2236, 2240, 2244, 2248, 2252,
            2256, 2260, 2264, 2268, 2272, 2276, 2280, 2284, 2288, 2292, 2296,
            2304, 2308, 2312, 2316, 2320, 2324, 2328, 2332, 2336, 2340, 2344,
            2348, 2352, 2356, 2360, 2364, 2368, 2372, 2376, 2380, 2384, 2388,
            2392, 2396, 2400, 2404,
        ];

        const allYears1800To2404 = util.range(1800, 2405);

        const computedYears1800To2404 =
            allYears1800To2404.filter(timeUtils.isLeapYear);
        expect(util.listEqual(
            computedYears1800To2404, leapYears1800To2404)).to.be.equal(true);
    });
});

describe('secondsInYear()', function () {
    it('returns number of seconds in given year', function () {
        expect(31622400).to.be.equal(timeUtils.secondsInYear(1988));
        expect(31536000).to.be.equal(timeUtils.secondsInYear(1989));
        expect(31622400).to.be.equal(timeUtils.secondsInYear(2000));
        expect(31536000).to.be.equal(timeUtils.secondsInYear(2100));
    });
});

describe('secondsInMonth()', function () {
    it('returns number of seconds in given month', function () {
        expect(2505600).to.be.equal(timeUtils.secondsInMonth(1, 1988));
        expect(2419200).to.be.equal(timeUtils.secondsInMonth(1, 1989));
        expect(2678400).to.be.equal(timeUtils.secondsInMonth(0, 1988));
        expect(2678400).to.be.equal(timeUtils.secondsInMonth(0, 1989));
        expect(2592000).to.be.equal(timeUtils.secondsInMonth(3, 1988));
        expect(2592000).to.be.equal(timeUtils.secondsInMonth(3, 1989));
    });
});

describe('getColumnMetadataAux()', function () {
    it('returns dict of (startedAt, delta) for hour/day/week', function () {
        const secsSinceEpoch = 1541711469;  // 11/8/18 1:11p PST
        const expectedResult = {
            h: [1541710800, 3600],
            d: [1541635200, 3600 * 24],
            w: [1541635200, 3600 * 24 * 7],
            m: [1539648000, 3600 * 24 * 30],
            y: [1513728000, 3600 * 24 * 365],
        };
        const actualResult =
            timeUtils.getColumnMetadataAux(10, 2018, secsSinceEpoch);
        const equalityResult =
            util.dictEqual(expectedResult, actualResult, util.listEqual);
        expect(equalityResult).to.be.equal(true);
    });
});
