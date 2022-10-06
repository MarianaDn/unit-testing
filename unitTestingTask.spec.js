const unitTestingTask = require("./unitTestingTask");

const currentDate = new Date(2022, 8, 26, 11, 32, 25, 4);

const expectedLangResults = {
  be: {
    id: require("./lang/be"),
    MMMM: "верасень",
    MMM: "вер",
    MM: "09",
    M: "9",
    DDD: "панядзелак",
    DD: "пн",
    D: "пн",
    A: "раніцы",
    a: "раніцы",
  },
  cs: {
    id: require("./lang/cs"),
    MMMM: "říjen",
    MMM: "zář",
    MM: "09",
    M: "9",
    DDD: "pondělí",
    DD: "po",
    D: "po",
    A: "dopoledne",
    a: "dopoledne",
  },
  kk: {
    id: require("./lang/kk"),
    MMMM: "қыркүйек",
    MMM: "қыр",
    MM: "09",
    M: "9",
    DDD: "дүйсенбі",
    DD: "дс",
    D: "дс",
  },
  pl: {
    id: require("./lang/pl"),
    MMMM: "wrzesień",
    MMM: "wrz",
    MM: "09",
    M: "9",
    DDD: "poniedziałek",
    DD: "pon",
    D: "Pn",
    A: "rano",
    a: "rano",
  },
  ru: {
    id: require("./lang/ru"),
    MMMM: "сентябрь",
    MMM: "сен",
    MM: "09",
    M: "9",
    DDD: "понедельник",
    DD: "пн",
    D: "пн",
    A: "утра",
    a: "утра",
  },
  tr: {
    id: require("./lang/tr"),
    MMMM: "Eylül",
    MMM: "Eyl",
    MM: "09",
    M: "9",
    DDD: "Pazartesi",
    DD: "Pts",
    D: "Pt",
  },
  tt: {
    id: require("./lang/tt"),
    MMMM: "сентябрь",
    MMM: "сен",
    MM: "09",
    M: "9",
    DDD: "дүшәмбе",
    DD: "дш",
    D: "дш",
  },
  uk: {
    id: require("./lang/uk"),
    MMMM: "вересень",
    MMM: "вер",
    MM: "09",
    M: "9",
    DDD: "понеділок",
    DD: "пн",
    D: "пн",
    A: "ранку",
    a: "ранку",
  },
};

describe("test error about wrong format", () => {
  const language = Object.keys(expectedLangResults)[0];

  beforeAll(() =>
    unitTestingTask.lang(`${language}`, expectedLangResults[language].id)
  );

  it(`should show error about wrong format`, () => {
    expect(unitTestingTask).toThrowError("Argument `format` must be a string");
  });
});

describe("test with using different languages", () => {
  Object.keys(expectedLangResults).forEach((key) => {
    const currentLanguage = key;

    describe(`use ${currentLanguage} language`, () => {
      beforeAll(() =>
        unitTestingTask.lang(
          `${currentLanguage}`,
          expectedLangResults[currentLanguage].id
        )
      );

      it(`should show full name of month on ${currentLanguage} language`, () => {
        expect(unitTestingTask("MMMM", currentDate)).toBe(
          expectedLangResults[currentLanguage].MMMM
        );
      });

      it(`should show short name of month on ${currentLanguage} language`, () => {
        expect(unitTestingTask("MMM", currentDate)).toBe(
          expectedLangResults[currentLanguage].MMM
        );
      });

      it(`should show short name of month on ${currentLanguage} language`, () => {
        expect(unitTestingTask("MM", currentDate)).toBe(
          expectedLangResults[currentLanguage].MM
        );
      });

      it(`should show number of month in year without zero-padding on ${currentLanguage} language`, () => {
        expect(unitTestingTask("M", currentDate)).toBe(
          expectedLangResults[currentLanguage].M
        );
      });

      it(`should show full name of day on ${currentLanguage} language`, () => {
        expect(unitTestingTask("DDD", currentDate)).toBe(
          expectedLangResults[currentLanguage].DDD
        );
      });

      it(`should show short name of day on ${currentLanguage} language`, () => {
        expect(unitTestingTask("DD", currentDate)).toBe(
          expectedLangResults[currentLanguage].DD
        );
      });

      it(`should show min name of day on ${currentLanguage} language`, () => {
        expect(unitTestingTask("D", currentDate)).toBe(
          expectedLangResults[currentLanguage].D
        );
      });

      if (expectedLangResults[key].A) {
        it(`should show AM/PM for time less than 12`, () => {
          expect(unitTestingTask("A", currentDate)).toBe(
            `${expectedLangResults[currentLanguage].A}`
          );
        });
      }

      if (expectedLangResults[key].a) {
        it(`should show am/pm for time less than 12`, () => {
          expect(unitTestingTask("a", currentDate)).toBe(
            `${expectedLangResults[currentLanguage].a}`
          );
        });
      }
    });
  });
});

const currentDateWithLaterTime = new Date(2022, 8, 26, 7, 45, 5, 4);

const expectedResult = {
  cs: {
    id: require("./lang/cs"),
    YYYY: "2022",
    YY: "22",
    dd: "26",
    d: "26",
    HH: "07",
    H: "7",
    hh: "07",
    h: "7",
    mm: "45",
    m: "45",
    ss: "05",
    s: "5",
    ff: "004",
    f: "4",
    ZZ: "+0300",
    Z: "+03:00",
  },
};

describe(`test other cases`, () => {
  const currentLanguage = Object.keys(expectedResult)[0];

  beforeAll(() =>
    unitTestingTask.lang(
      `${currentLanguage}`,
      expectedResult[currentLanguage].id
    )
  );

  it(`should show 4-digit year`, () => {
    expect(unitTestingTask("YYYY", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].YYYY
    );
  });

  it(`should show last 2 digit of year`, () => {
    expect(unitTestingTask("YY", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].YY
    );
  });

  it(`should show zero-padded number of day in month`, () => {
    expect(unitTestingTask("dd", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].dd
    );
  });

  it(`should show number of day in month`, () => {
    expect(unitTestingTask("d", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].d
    );
  });

  it(`should show zero-padded hour in 24-hr format`, () => {
    expect(unitTestingTask("HH", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].HH
    );
  });

  it(`should show hour in 24-hr format`, () => {
    expect(unitTestingTask("H", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].H
    );
  });

  it(`should show zero-padded hour in 12-hr format`, () => {
    expect(unitTestingTask("hh", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].hh
    );
  });

  it(`should show hour in 12-hr format`, () => {
    expect(unitTestingTask("h", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].h
    );
  });

  it(`should show zero-padded minutes`, () => {
    expect(unitTestingTask("mm", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].m
    );
  });

  it(`should show minutes`, () => {
    expect(unitTestingTask("m", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].m
    );
  });

  it(`should show zero-padded seconds`, () => {
    expect(unitTestingTask("ss", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].ss
    );
  });

  it(`should show seconds`, () => {
    expect(unitTestingTask("s", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].s
    );
  });

  it(`should show zero-padded milliseconds`, () => {
    expect(unitTestingTask("ff", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].ff
    );
  });

  it(`should show milliseconds`, () => {
    expect(unitTestingTask("f", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].f
    );
  });

  it(`should show time-zone in ISO8601-compatible basic format`, () => {
    expect(unitTestingTask("ZZ", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].ZZ
    );
  });

  it(`should show time-zone in ISO8601-compatible extended format`, () => {
    expect(unitTestingTask("Z", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].Z
    );
  });
});

const nightTime = new Date(2022, 8, 26, 1, 20, 16, 4);

const expectedEarlyTimeResults = {
  be: {
    A: "ночы",
    a: "ночы",
  },
  ru: {
    A: "ночи",
    a: "ночи",
  },
  uk: {
    A: "ночі",
    a: "ночі",
  },
};

describe("test meridiem for time less than 4 AM", () => {
  Object.keys(expectedEarlyTimeResults).forEach((key) => {
    const currentLanguage = key;

    describe(`test for ${currentLanguage} language`, () => {
      beforeAll(() =>
        unitTestingTask.lang(
          `${currentLanguage}`,
          expectedEarlyTimeResults[currentLanguage].id
        )
      );

      it(`should show AM or PM for time less than 4`, () => {
        expect(unitTestingTask("A", nightTime)).toBe(
          `${expectedEarlyTimeResults[currentLanguage].A}`
        );
      });

      it(`should show am or pm for time less than 4`, () => {
        expect(unitTestingTask("a", nightTime)).toBe(
          `${expectedEarlyTimeResults[currentLanguage].a}`
        );
      });
    });
  });
});

const dayTime = new Date(2022, 8, 26, 15, 15, 15, 4);

const expectedDayTimeResults = {
  be: {
    A: "дня",
    a: "дня",
  },
  ru: {
    A: "дня",
    a: "дня",
  },
  uk: {
    A: "дня",
    a: "дня",
  },
};

describe("test meridiem for time less than 17", () => {
  Object.keys(expectedDayTimeResults).forEach((key) => {
    const currentLanguage = key;

    describe(`test for ${currentLanguage} language`, () => {
      beforeAll(() =>
        unitTestingTask.lang(
          `${currentLanguage}`,
          expectedDayTimeResults[currentLanguage].id
        )
      );

      it(`should show AM or PM for time less than 17`, () => {
        expect(unitTestingTask("A", dayTime)).toBe(
          `${expectedDayTimeResults[currentLanguage].A}`
        );
      });

      it(`should show am or pm for time less than 17`, () => {
        expect(unitTestingTask("a", dayTime)).toBe(
          `${expectedDayTimeResults[currentLanguage].a}`
        );
      });
    });
  });
});

const eveningTime = new Date(2022, 8, 26, 22, 17, 34, 4);

const expectedEveningTimeResults = {
  be: {
    A: "вечара",
    a: "вечара",
  },
  cs: {
    A: "odpoledne",
    a: "odpoledne",
  },
  pl: {
    A: "",
    a: "",
  },
  ru: {
    A: "вечера",
    a: "вечера",
  },
  uk: {
    A: "вечора",
    a: "вечора",
  },
};

describe("test meridiem for time more than 17", () => {
  Object.keys(expectedEveningTimeResults).forEach((key) => {
    const currentLanguage = key;

    describe(`test for ${currentLanguage} language`, () => {
      beforeAll(() =>
        unitTestingTask.lang(
          `${currentLanguage}`,
          expectedEveningTimeResults[currentLanguage].id
        )
      );

      it(`should show AM or PM for time more than 17`, () => {
        expect(unitTestingTask("A", eveningTime)).toBe(
          `${expectedEveningTimeResults[currentLanguage].A}`
        );
      });

      it(`should show am or pm for time more than 17`, () => {
        expect(unitTestingTask("a", eveningTime)).toBe(
          `${expectedEveningTimeResults[currentLanguage].a}`
        );
      });
    });
  });
});
