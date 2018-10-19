/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Thursday, 23rd August 2018 9:24:39 am
 * @Email:  developer@xyfindables.com
 * @Filename: xyo-hash.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Thursday, 11th October 2018 1:20:41 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XyoObject } from '../xyo-core-components/xyo-object';
import { IXyoHashProvider } from '../@types/xyo-hashing';
import { XyoError, XyoErrors } from '../xyo-core-components/xyo-error';

/**
 * Wraps a XyoHash value. Additionally, adds a `verifyHash`
 * instance method that can be used to verify the hash value matches
 * against a set of data
 */
export class XyoHash extends XyoObject {

  /**
   * Creates new instance of XyoBasicHashBase and initializes it with
   * the hash that has already been calculated `pastHash`
   *
   * @param pastHash An already calculated hash value
   */

  constructor(
    private readonly hashProvider: IXyoHashProvider | undefined,
    public readonly hash: Buffer,
    public readonly major: number,
    public readonly minor: number
  ) {
    super(major, minor);
  }

  /**
   * Verifies that a hash matches to a source data.
   *
   * @param data The source data to compare to
   */

  public async verifyHash(data: Buffer): Promise<boolean> {
    if (this.hashProvider === undefined) {
      throw new XyoError(`Can not verify hash, no hash provider provider`, XyoErrors.CRITICAL);
    }

    const xyoHash = await this.hashProvider.createHash(data);
    return xyoHash.hash.equals(this.hash);
  }
}