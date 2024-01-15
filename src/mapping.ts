//@ts-ignore
import { require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Event, Block, ByteArray } from "@hyperoracle/zkgraph-lib";

var addr_Contract = Bytes.fromHexString(
  "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06"
);
var esig_Approval = Bytes.fromHexString(
  "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
);

export function handleBlocks(blocks: Block[]): Bytes {
  let events: Event[] = blocks[0].events;

  let allowances: ByteArray = ByteArray.empty();
  for (let i = events.length - 1; i >= 0; i--) {
    if (events[i].address == addr_Contract && events[i].esig == esig_Approval) {
      // Concatenate owner, spender, and value
      allowances.concat(events[i].topic1);
      allowances.concat(events[i].topic2);
      allowances.concat(events[i].data); // Assuming value is in data
    }
  }
  let state = Bytes.fromByteArray(allowances);

  return state;
}