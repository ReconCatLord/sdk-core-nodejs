/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Friday, 21st September 2018 10:33:23 am
 * @Email:  developer@xyfindables.com
 * @Filename: xyo-base.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Thursday, 11th October 2018 3:54:53 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XyoLogger } from "./xyo-logger";

/**
 * A general purpose base class that can be used to incorporate
 * base functionality into the classes that extend it.
 *
 * This can be extended to include cross-cutting features like
 * logging that are not domain-specific.
 *
 * @export
 * @abstract
 * @class XyoBase
 */
export abstract class XyoBase {

  /** Exposes a logger instance that can be used to log to central output stream */
  public static logger: XyoLogger;

  /** Logs to the `info` level */
  protected logInfo(message?: any, ...optionalParams: any[]) {
    const resolvedOptionalParams = (optionalParams && optionalParams.length && optionalParams) || undefined;
    if (resolvedOptionalParams) {
      XyoBase.logger.info(`${this.constructor.name}: ${message}`, resolvedOptionalParams);
    } else {
      XyoBase.logger.info(`${this.constructor.name}: ${message}`);
    }
  }

  /** Logs to the `error` level */
  protected logError(message?: any, ...optionalParams: any[]) {
    const resolvedOptionalParams = (optionalParams && optionalParams.length && optionalParams) || undefined;
    if (resolvedOptionalParams) {
      XyoBase.logger.error(`${this.constructor.name}: ${message}`, resolvedOptionalParams);
    } else {
      XyoBase.logger.error(`${this.constructor.name}: ${message}`);
    }
  }

  /** Logs to the `warn` level */
  protected logWarn(message?: any, ...optionalParams: any[]) {
    const resolvedOptionalParams = (optionalParams && optionalParams.length && optionalParams) || undefined;
    if (resolvedOptionalParams) {
      XyoBase.logger.warn(`${this.constructor.name}: ${message}`, resolvedOptionalParams);
    } else {
      XyoBase.logger.warn(`${this.constructor.name}: ${message}`);
    }
  }
}

XyoBase.logger = new XyoLogger();