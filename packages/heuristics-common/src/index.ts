/*
 * @Author: XY | The Findables Company <ryanxyo>
 * @Date:   Friday, 7th December 2018 1:23:15 pm
 * @Email:  developer@xyfindables.com
 * @Filename: index.ts
 * @Last modified by: ryanxyo
 * @Last modified time: Friday, 7th December 2018 4:35:30 pm
 * @License: All Rights Reserved
 * @Copyright: Copyright XY | The Findables Company
 */

import { getUnsignedIntegerSerializer, getSignedIntegerSerializer, getDoubleSerializer, XyoSerializableNumber } from '@xyo-network/heuristics'
import { schema } from '@xyo-network/serialization-schema'
import { XyoBaseSerializable, IXyoDeserializer, parse, ParseQuery, IXyoSerializationService } from '@xyo-network/serialization'

export const rssiSerializationProvider = getSignedIntegerSerializer(schema.rssi.id)
export const unixTimeSerializationProvider = getUnsignedIntegerSerializer(schema.time.id)
export const latitudeSerializationProvider = getDoubleSerializer(schema.latitude.id)
export const longitudeSerializationProvider = getDoubleSerializer(schema.longitude.id)

export class XyoGps extends XyoBaseSerializable {
  public static deserializer: IXyoDeserializer<XyoGps>

  public readonly schemaObjectId = schema.gps.id

  constructor (public readonly latitude: number, public readonly longitude: number) {
    super()
  }

  public getData() {
    return [
      latitudeSerializationProvider.newInstance(this.latitude),
      longitudeSerializationProvider.newInstance(this.longitude)
    ]
  }
}

// tslint:disable-next-line:max-classes-per-file
class XyoGpsDeserializer implements IXyoDeserializer<XyoGps> {
  public schemaObjectId = schema.gps.id

  public deserialize(data: Buffer, serializationService: IXyoSerializationService): XyoGps {
    const parseResult = parse(data)
    const parseQuery = new ParseQuery(parseResult)

    return new XyoGps(
      serializationService
        .deserialize(parseQuery.getChildAt(0).readData(true))
        .hydrate<XyoSerializableNumber>().number,
      serializationService.deserialize(parseQuery.getChildAt(1).readData(true))
        .hydrate<XyoSerializableNumber>().number
    )
  }
}

XyoGps.deserializer = new XyoGpsDeserializer()