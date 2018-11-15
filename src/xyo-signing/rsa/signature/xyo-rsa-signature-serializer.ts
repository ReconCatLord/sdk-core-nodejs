/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Friday, 14th September 2018 12:51:38 pm
 * @Email:  developer@xyfindables.com
 * @Filename: xyo-rsa-signature-serializer.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Wednesday, 14th November 2018 4:58:44 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XyoRsaSignature } from './xyo-rsa-signature';
import { XyoSerializer } from '../../../xyo-serialization/xyo-serializer';
import { IXyoObject } from '../../../xyo-core-components/xyo-object';
import { IXyoSignerProvider, IXyoSignature } from '../../../@types/xyo-signing';

export class XyoRsaSignatureSerializer extends XyoSerializer<XyoRsaSignature> {

  constructor(
    private readonly minor: number,
    private readonly xyoRsaSignerProvider: IXyoSignerProvider,
    private readonly xyoRsaSignatureClass: {
      new (
        signature: Buffer,
        verifySign: (signature: IXyoSignature, data: Buffer, publicKey: IXyoObject) => Promise<boolean>
      ): XyoRsaSignature
    }
  ) {
    super();
  }

  get description () {
    return {
      major: 0x05,
      minor: this.minor,
      sizeOfBytesToGetSize: 2,
      sizeIdentifierSize: 2
    };
  }

  public deserialize(buffer: Buffer) {
    return new this.xyoRsaSignatureClass(
      buffer.slice(2),
      this.xyoRsaSignerProvider.verifySign
    );
  }

  public serialize(rsaSignature: XyoRsaSignature) {
    return rsaSignature.rawSignature;
  }
}
