import MutantDnaAnalyzer from '../../../../src/webapi/models/MutantDnaAnalyzer';

test('MutantDnaAnalyzer | constructor is used | new MutantDnaAnalyzer is successfully created', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();

  expect(mutantDnaAnalyzer).not.toBeNull();
});

test('MutantDnaAnalyzer | Dna is not an array | isValidDna returns false', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = {};

  expect(mutantDnaAnalyzer.isValidDna(dna)).toBeFalsy();
});

test('MutantDnaAnalyzer | Dna is an array but contains non string elements | isValidDna returns false', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['', {}];

  expect(mutantDnaAnalyzer.isValidDna(dna)).toBeFalsy();
});

test('MutantDnaAnalyzer | Dna is an array of strings but elements length do not match dna length | isValidDna returns false', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['AA', 'ATCGA', 'ATCGAT', 'A'];

  expect(mutantDnaAnalyzer.isValidDna(dna)).toBeFalsy();
});

test('MutantDnaAnalyzer | Dna is an array of strings and elements length match dna length | isValidDna returns true', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['ATCGAT', 'GCTAGC', 'CTAGAG', 'AGCTCA', 'ATCGAT', 'GCTAGC'];

  expect(mutantDnaAnalyzer.isValidDna(dna)).toBeTruthy();
});

test('MutantDnaAnalyzer | invalid dna | isMutant throws an error', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['', '', ''];

  expect(() => mutantDnaAnalyzer.isMutant(dna)).toThrowError('Invalid dna.');
});

test('MutantDnaAnalyzer | Dna length is lower than 4 | isMutant returns false', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['CGA', 'CTG', 'ATC'];

  expect(mutantDnaAnalyzer.isMutant(dna)).toBeFalsy();
});

test('MutantDnaAnalyzer | Dna array has not allowed base | isMutant throws an error', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['AAAGGG',
    'TCCGTC',
    'TAAGTA',
    'CGTTAA',
    'TATACA',
    'CGATCB'];

  expect(() => mutantDnaAnalyzer.isMutant(dna)).toThrowError('Invalid dna.');
});

test('MutantDnaAnalyzer | No mutant gen is found | isMutant returns false', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['ATCGAT',
    'GCTAGC',
    'CTAGCT',
    'AGCTAG',
    'ATCGAT',
    'GCTAGC',];

  expect(mutantDnaAnalyzer.isMutant(dna)).toBeFalsy();
});

test('MutantDnaAnalyzer | One mutant gen is horizontally found | isMutant returns false', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['AAAAGA', 'GCTAGG', 'CTAGCC', 'AGCTAT', 'ATCGTC', 'ATAAGA'];

  expect(mutantDnaAnalyzer.isMutant(dna)).toBeFalsy();
});

test('MutantDnaAnalyzer | One mutant gen is vertically found | isMutant returns false', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['TGCTAG', 'GAACAG', 'CACTAG', 'TAGCTA', 'AATCGT', 'GCTAGC'];

  expect(mutantDnaAnalyzer.isMutant(dna)).toBeFalsy();
});

test('MutantDnaAnalyzer | One mutant gen is found in diagonal forward | isMutant returns false', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['CATGCT',
    'ACGTAC',
    'ATCAAG',
    'ATCCGA',
    'GATCGT',
    'AATAGT'];

  expect(mutantDnaAnalyzer.isMutant(dna)).toBeFalsy();
});

test('MutantDnaAnalyzer | One mutant gen is found in diagonal backward | isMutant returns false', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['GCATGC',
    'TATGTA',
    'CATTAA',
    'AATCCG',
    'GTATCG',
    'ATGTCG'];

  expect(mutantDnaAnalyzer.isMutant(dna)).toBeFalsy();
});

test('MutantDnaAnalyzer | Two mutant gens are horizontally found | isMutant returns true', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['GAAAAG',
    'TATCCG',
    'GATGTA',
    'CGTTTT',
    'ATATCG',
    'ATATCG'];

  expect(mutantDnaAnalyzer.isMutant(dna)).toBeTruthy();
});

test('MutantDnaAnalyzer | Two mutant gens are vertically found | isMutant returns true', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['GCATGC',
    'CATGTG',
    'GATTAG',
    'AATCCG',
    'GAATCG',
    'GACTCA'];

  expect(mutantDnaAnalyzer.isMutant(dna)).toBeTruthy();
});

test('MutantDnaAnalyzer | Two mutant gens are found in diagonal forward | isMutant returns true', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['CGTGCA',
    'ACGTAG',
    'GTCGAT',
    'ATCCGC',
    'TATCGA',
    'TCTAGA'];

  expect(mutantDnaAnalyzer.isMutant(dna)).toBeTruthy();
});

test('MutantDnaAnalyzer | Two mutant gens are found in diagonal backward | isMutant returns true', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();
  var dna = ['CGTGCG',
    'ACGTAG',
    'GTTAAT',
    'ATACGT',
    'TATCGA',
    'TAAGCA'];

  expect(mutantDnaAnalyzer.isMutant(dna)).toBeTruthy();
});

test('MutantDnaAnalyzer | Edge cases with mutants | isMutant returns true', () => {
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();

  var dna = ['ACGGGG',
    'TCCGTC',
    'TACGTA',
    'CGTTAA',
    'TATACA',
    'CGATCA'];
  expect(mutantDnaAnalyzer.isMutant(dna)).toBeTruthy();
});
