/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Monday, 17th September 2018 10:49:02 am
 * @Email:  developer@xyfindables.com
 * @Filename: xyo-single-type-array-short.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Wednesday, 14th November 2018 5:15:10 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XyoArray } from '../xyo-array';
import { IXyoObject } from '../../xyo-object';

/**
 * An XyoSingleTypeArrayShort is a collection of homogenous
 * items who's total size should not exceed 2 ^ 16 - 1 bytes when packed
 */

export class XyoSingleTypeArrayShort extends XyoArray {

  public static major = 0x01;
  public static minor = 0x02;

  /**
   * Creates a new instance of XyoSingleTypeArrayShort
   *
   * @param elementMajor The homogenous item major value
   * @param elementMinor The homogenous item minor value
   * @param array The underlying collection of homogenous items
   */

  constructor(elementMajor: number, elementMinor: number, array: IXyoObject[]) {
    super(elementMajor, elementMinor, XyoSingleTypeArrayShort.major, XyoSingleTypeArrayShort.minor, 2, array);
  }

  public getReadableName(): string {
    return 'single-type-array-short';
  }

  public getReadableValue() {
    return this.array;
  }
}
