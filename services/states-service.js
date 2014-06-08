/**
 * Created with WebStorm.
 * User: Mike Gray
 * Date: 6/7/14
 */
angular.module('eventApp').factory('StatesService', function ($q) {

    var states = [
        {
            code: 'AL',
            desc: 'Alabama'
        },
        {
            code: 'AK',
            desc: 'Alaska'
        },
        {
            code: 'AZ',
            desc: 'Arizona'
        },
        {
            code: 'AR',
            desc: 'Arkansas'
        },
        {
            code: 'CA',
            desc: 'California'
        },
        {
            code: 'CO',
            desc: 'Colorado'
        },
        {
            code: 'CT',
            desc: 'Connecticut'
        },
        {
            code: 'DE',
            desc: 'Deleware'
        },
        {
            code: 'DC',
            desc: 'District Of Columbia'
        },
        {
            code: 'FL',
            desc: 'Florida'
        },
        {
            code: 'GA',
            desc: 'Georgia'
        },
        {
            code: 'HI',
            desc: 'Hawaii'
        },
        {
            code: 'ID',
            desc: 'Idaho'
        },
        {
            code: 'IL',
            desc: 'Illinois'
        },
        {
            code: 'IN',
            desc: 'Indiana'
        },
        {
            code: 'IA',
            desc: 'Iowa'
        },
        {
            code: 'KS',
            desc: 'Kansas'
        },
        {
            code: 'KY',
            desc: 'Kentucky'
        },
        {
            code: 'LA',
            desc: 'Louisiana'
        },
        {
            code: 'ME',
            desc: 'Maine'
        },
        {
            code: 'MD',
            desc: 'Maryland'
        },
        {
            code: 'MA',
            desc: 'Massachusetts'
        },
        {
            code: 'MI',
            desc: 'Michigan'
        },
        {
            code: 'MN',
            desc: 'Minnesota'
        },
        {
            code: 'MS',
            desc: 'Mississippi'
        },
        {
            code: 'MO',
            desc: 'Missouri'
        },
        {
            code: 'MT',
            desc: 'Montana'
        },
        {
            code: 'NE',
            desc: 'Nebraska'
        },
        {
            code: 'NV',
            desc: 'Nevada'
        },
        {
            code: 'NH',
            desc: 'New Hampshire'
        },
        {
            code: 'NJ',
            desc: 'New Jersey'
        },
        {
            code: 'NM',
            desc: 'New Mexico'
        },
        {
            code: 'NY',
            desc: 'New York'
        },
        {
            code: 'NC',
            desc: 'North Carolina'
        },
        {
            code: 'ND',
            desc: 'North Dakota'
        },
        {
            code: 'OH',
            desc: 'Ohio'
        },
        {
            code: 'OK',
            desc: 'Oklahoma'
        },
        {
            code: 'OR',
            desc: 'Oregon'
        },
        {
            code: 'PA',
            desc: 'Pennsylvania'
        },
        {
            code: 'RI',
            desc: 'Rhode Island'
        },
        {
            code: 'SC',
            desc: 'South Carolina'
        },
        {
            code: 'SD',
            desc: 'South Dakota'
        },
        {
            code: 'TN',
            desc: 'Tennessee'
        },
        {
            code: 'TX',
            desc: 'Texas'
        },
        {
            code: 'UT',
            desc: 'Utah'
        },
        {
            code: 'VT',
            desc: 'Vermont'
        },
        {
            code: 'VA',
            desc: 'Virginia'
        },
        {
            code: 'WA',
            desc: 'Washington'
        },
        {
            code: 'WV',
            desc: 'West Virginia'
        },
        {
            code: 'WI',
            desc: 'Wisconsin'
        },
        {
            code: 'WY',
            desc: 'Wyoming'
        }
    ];

    return {
        getStates: function () {
            var deferred = $q.defer();
            setTimeout(function () {
                deferred.resolve(states);
            }, 100);
            return deferred.promise;
        }

    }
});