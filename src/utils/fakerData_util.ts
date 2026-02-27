import {faker} from '@faker-js/faker';

/**
 * FakerDataUtil - Generates dynamic test data for OrangeHRM Playwright automation.
 *
 * Fields covered:
 *   firstName, lastName, fullName, userName, employeeId,
 *   password, email, dateOfBirth, phone, address
 *
 * Usage (class style):
 *   const emp = FakerDataUtil.generateEmployeeData();
 *   console.log(emp.employeeId);  // → EMP-A3K9Z1
 *
 * Usage (named import style):
 *   import { generateEmployeeData } from '../utils/fakerData_util';
 */

// ─── Type ─────────────────────────────────────────────────────────────────────

export interface EmployeeData {
  firstName:   string;
  lastName:    string;
  fullName:    string;
  userName:    string;
  employeeId:  string;
  password:    string;
  email:       string;
  dateOfBirth: string;
  phone:       string;
  address:     string;
}

// ─── Class ────────────────────────────────────────────────────────────────────

export class FakerDataUtil {

  // ── Individual Generators ─────────────────────────────────────────────────

  /** e.g. "John" */
  static getFirstName(): string {
    return faker.person.firstName();
  }

  /** e.g. "Carter" */
  static getLastName(): string {
    return faker.person.lastName();
  }

  /** e.g. "John Carter" */
  static getFullName(): string {
    return `${this.getFirstName()} ${this.getLastName()}`;
  }

  /**
   * Employee ID with hyphen separator and 6-char alphanumeric suffix.
   * Format:  EMP-XXXXXX  →  e.g.  EMP-A3K9Z1
   *
   * How it works:
   *   faker.string.alphanumeric(6)  → random 6 chars from [a-z0-9]
   *   .toUpperCase()                → convert to [A-Z0-9]
   *   `${prefix}-${alphaNum}`       → join with hyphen
   *
   * @param prefix - optional prefix, defaults to 'EMP'
   */
  static getEmployeeId(prefix = 'EMP'): string {
    const alphaNum = faker.string.alphanumeric(6).toUpperCase();
    return `${prefix}-${alphaNum}`;
    //              ↑
    //       hyphen goes here — change to any separator you like
  }

  /**
   * Username: first initial + last name + 3-digit number.
   * e.g. "jcarter742"
   */
  static getUserName(): string {
    const first = faker.person.firstName().toLowerCase().charAt(0);
    const last  = faker.person.lastName().toLowerCase().replace(/\s+/g, '');
    const num   = faker.string.numeric(3);
    return `${first}${last}${num}`;
  }

  /**
   * Strong password — always contains uppercase, lowercase, digit, special char.
   *
   * HOW THE SHUFFLE WORKS (line by line):
   * ─────────────────────────────────────
   *  const raw = "ABcdxy73@"
   *
   *  Step 1 → raw.split('')
   *    Breaks the string into individual characters:
   *    "ABcdxy73@"  →  ['A','B','c','d','x','y','7','3','@']
   *
   *  Step 2 → .sort(() => Math.random() - 0.5)
   *    sort() normally compares two elements (a, b) and expects:
   *      negative  → keep a before b
   *      positive  → swap a and b
   *      zero      → no change
   *    By returning (Math.random() - 0.5), we get a random number
   *    between -0.5 and +0.5 each time — so the decision to swap or
   *    not is completely random → array gets shuffled.
   *    Result: ['c','7','A','@','x','B','3','d','y']  (random order)
   *
   *  Step 3 → .join('')
   *    Joins the shuffled array back into a single string:
   *    ['c','7','A','@','x','B','3','d','y']  →  "c7A@xB3dy"
   *
   *  WHY shuffle? Without it the password is always "UPPERlowerdigitSpecial"
   *  which is predictable. Shuffling makes it look like a real random password.
   */
  static getPassword(): string {
    const upper   = faker.string.alpha({ length: 2, casing: 'upper' });    // e.g. "AB"
    const lower   = faker.string.alpha({ length: 4, casing: 'lower' });    // e.g. "cdxy"
    const digits  = faker.string.numeric(2);                                // e.g. "73"
    const special = faker.helpers.arrayElement(['@', '#', '$', '!', '%']); // e.g. "@"

    const raw = `${upper}${lower}${digits}${special}`;

    return raw
      .split('')                          // Step 1: string → char array
      .sort(() => Math.random() - 0.5)   // Step 2: randomly shuffle
      .join('');                          // Step 3: char array → string
  }

  /**
   * Email built from firstName + lastName to look realistic.
   * e.g. "john.carter42@gmail.com"
   */
  static getEmail(firstName?: string, lastName?: string): string {
    const fn     = (firstName ?? faker.person.firstName()).toLowerCase();
    const ln     = (lastName  ?? faker.person.lastName()).toLowerCase();
    const num    = faker.string.numeric(2);
    const domain = faker.helpers.arrayElement(['gmail.com', 'yahoo.com', 'outlook.com', 'test.com']);
    return `${fn}.${ln}${num}@${domain}`;
  }

  /**
   * Date of birth as MM/DD/YYYY for someone aged 22–55.
   * e.g. "03/14/1991"
   */
  static getDateOfBirth(minAge = 22, maxAge = 55): string {
    const dob  = faker.date.birthdate({ min: minAge, max: maxAge, mode: 'age' });
    const mm   = String(dob.getMonth() + 1).padStart(2, '0');
    const dd   = String(dob.getDate()).padStart(2, '0');
    const yyyy = dob.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }

  /**
   * 10-digit phone number.
   * e.g. "9876543210"
   */
  static getPhone(): string {
    return faker.string.numeric(10);
  }

  /**
   * Street address.
   * e.g. "742 Evergreen Terrace"
   */
  static getAddress(): string {
    return faker.location.streetAddress();
  }

  // ── Composite Builder ─────────────────────────────────────────────────────

  /**
   * Builds and returns a complete EmployeeData object.
   * firstName/lastName are generated once and reused across fullName + email
   * so all fields are internally consistent.
   *
   * @example
   *   const emp = FakerDataUtil.generateEmployeeData();
   *   emp.employeeId   // "EMP-A3K9Z1"
   *   emp.fullName     // "John Carter"
   *   emp.email        // "john.carter42@gmail.com"
   */
  static generateEmployeeData(): EmployeeData {
    const firstName = this.getFirstName();
    const lastName  = this.getLastName();

    return {
      firstName,
      lastName,
      fullName:    `${firstName} ${lastName}`,
      userName:    this.getUserName(),
      employeeId:  this.getEmployeeId(),
      password:    this.getPassword(),
      email:       this.getEmail(firstName, lastName),
      dateOfBirth: this.getDateOfBirth(),
      phone:       this.getPhone(),
      address:     this.getAddress(),
    };
  }
}

/*
 * Class import style:
const empid=FakerDataUtil.getEmployeeId;
 */

// ─── Named exports — use without class syntax if preferred ────────────────────
export const getFirstName         = ()                    => FakerDataUtil.getFirstName();
export const getLastName          = ()                    => FakerDataUtil.getLastName();
export const getFullName          = ()                    => FakerDataUtil.getFullName();
export const getEmployeeId        = (prefix?: string)     => FakerDataUtil.getEmployeeId(prefix);
export const getUserName          = ()                    => FakerDataUtil.getUserName();
export const getPassword          = ()                    => FakerDataUtil.getPassword();
export const getEmail             = (fn?: string, ln?: string) => FakerDataUtil.getEmail(fn, ln);
export const getDateOfBirth       = (min?: number, max?: number) => FakerDataUtil.getDateOfBirth(min, max);
export const getPhone             = ()                    => FakerDataUtil.getPhone();
export const getAddress           = ()                    => FakerDataUtil.getAddress();
export const generateEmployeeData = ()                    => FakerDataUtil.generateEmployeeData();

/*
 * Named style export(direct import, no classes needed)
import{getEmployeeId} from 
 */

