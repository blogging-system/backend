import { appConfig } from "@src/shared/config";
import * as jwt from "jsonwebtoken";

/**
 * A util class for generating and managing tokens.
 */
export class TokenUtil {
  /**
   * Generates a verification token using the provided payload.
   *
   * @param {any} payload - The data to include in the token payload.
   * @returns {string} - The generated verification token.
   */
  public static generateVerificationToken(payload: any): string {
    return this.generateToken(
      payload,
      appConfig.tokenSecrets.verificationToken.secret,
      appConfig.tokenSecrets.verificationToken.expiresIn,
    );
  }

  /**
   * Verifies a verification token using the verification token secret.
   *
   * @param {string} token - The verification token to verify.
   * @returns {any} - The verified token payload.
   */
  public static verifyVerificationToken(token: string): any {
    return this.verifyToken(token, appConfig.tokenSecrets.verificationToken.secret);
  }

  /**
   * Generates an access token using the provided payload.
   *
   * @param {any} payload - The data to include in the token payload.
   * @returns {string} - The generated access token.
   */
  public static generateAccessToken(payload: any): string {
    return this.generateToken(
      payload,
      appConfig.tokenSecrets.accessToken.secret,
      appConfig.tokenSecrets.accessToken.expiresIn,
    );
  }

  /**
   * Verifies an access token using the access token secret.
   *
   * @param {string} token - The access token to verify.
   * @returns {any} - The verified token payload.
   */
  public static verifyAccessToken(token: string): any {
    return this.verifyToken(token, appConfig.tokenSecrets.accessToken.secret);
  }

  /**
   * Generates a refresh token using the provided payload.
   *
   * @param {any} payload - The data to include in the token payload.
   * @returns {string} - The generated refresh token.
   */
  public static generateRefreshToken(payload: any): string {
    return this.generateToken(
      payload,
      appConfig.tokenSecrets.refreshToken.secret,
      appConfig.tokenSecrets.refreshToken.expiresIn,
    );
  }

  /**
   * Verifies a refresh token using the refresh token secret.
   *
   * @param {string} token - The refresh token to verify.
   * @returns {any} - The verified token payload.
   */
  public static verifyRefreshToken(token: string): any {
    return this.verifyToken(token, appConfig.tokenSecrets.refreshToken.secret);
  }

  /**
   * Generates a token with the provided payload, secret, and expiration.
   *
   * @param payload - The data to include in the token payload.
   * @param secret - The secret key used to sign the token.
   * @param expiresIn - The expiration time for the token.
   * @returns The generated token.
   */
  private static generateToken(payload: any, secret: string, expiresIn: string): string {
    return jwt.sign(payload, secret, { expiresIn });
  }

  /**
   *  Verifies a token using the specified secret.
   *
   *  @param {string} token - The token to verify.
   *  @param {string} secret - The secret used to verify the token.
   *  @returns {Promise<any>} - A promise that resolves to the verified token payload.
   */

  private static verifyToken(token, secret) {
    return jwt.verify(token, secret);
  }
}
