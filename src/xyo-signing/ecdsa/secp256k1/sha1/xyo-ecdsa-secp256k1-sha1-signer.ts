/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Wednesday, 3rd October 2018 10:28:08 am
 * @Email:  developer@xyfindables.com
 * @Filename: xyo-ec-secp-256k-sha1-signer.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Wednesday, 14th November 2018 4:56:37 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { XyoEcdsaSecp256k1Signer } from "../signer/xyo-ecdsa-secp256k1-signer";
import { IXyoSignature } from '../../../../@types/xyo-signing';
import { IXyoObject } from "../../../../xyo-core-components/xyo-object";
import { XyoEcdsaSecp256k1Sha1Signature } from "./xyo-ecdsa-secp256k1-sha1-signature";

export class XyoEcdsaSecp256k1Sha1Signer extends XyoEcdsaSecp256k1Signer {

  public static major = 0x06;
  public static minor = 0x02;

  constructor(
    private readonly getSignature: (data: Buffer) => Promise<Buffer>,
    public readonly getPublicXY: () => {x: Buffer, y: Buffer},
    private readonly verifySign: (signature: IXyoSignature, data: Buffer, publicKey: IXyoObject) => Promise<boolean>,
    public readonly getPrivateKey: () => string
  ) {
    super(XyoEcdsaSecp256k1Sha1Signer.major, XyoEcdsaSecp256k1Sha1Signer.minor);
  }

  public getReadableName(): string {
    return 'ecdsa-secp256k1-sha1-signer';
  }

  public getReadableValue() {
    return null;
  }

  public async signData(data: Buffer): Promise<IXyoSignature> {
    const rawSignature = await this.getSignature(data);
    return new XyoEcdsaSecp256k1Sha1Signature(rawSignature, this.verifySign);
  }
}
