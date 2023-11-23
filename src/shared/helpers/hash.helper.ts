import * as bcrypt from 'bcrypt';

/**
 * A helper class for generating and verifying hashes using bcrypt.
 */
export class HashHelper {
  /**
   * Generates a hash for the given plain text password.
   *
   * @param plainText - The plain text password to hash.
   * @returns A Promise that resolves to the hashed password.
   */
  static async generateHash(plainText: string): Promise<string> {
    return await bcrypt.hash(plainText, 10);
  }

  /**
   * Verifies if the given plain text password matches the provided hash.
   *
   * @param plainText - The plain text password to verify.
   * @param hash - The hash to compare against.
   * @returns A Promise that resolves to true if the password matches the hash, or false otherwise.
   */
  static async verifyHash(plainText: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainText, hash);
    return isMatch;
  }
}
