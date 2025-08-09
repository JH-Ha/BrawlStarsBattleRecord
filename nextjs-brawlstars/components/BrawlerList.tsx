import React from "react";
import { useTranslation } from 'react-i18next';

export type BrawlerName = 
  | '8-BIT' | 'AMBER' | 'ANGELO' | 'ASH' | 'BARLEY' | 'BEA' | 'BELLE' | 'BERRY'
  | 'BIBI' | 'BO' | 'BONNIE' | 'BROCK' | 'BULL' | 'BUSTER' | 'BUZZ' | 'BYRON'
  | 'CARL' | 'CHARLIE' | 'CHESTER' | 'CHUCK' | 'CLANCY' | 'COLETTE' | 'COLONEL RUFFS'
  | 'COLT' | 'CORDELIUS' | 'CROW' | 'DARRYL' | 'DOUG' | 'DRACO' | 'DYNAMIKE'
  | 'EDGAR' | 'EL PRIMO' | 'EMZ' | 'EVE' | 'FANG' | 'FRANK' | 'GALE' | 'GENE'
  | 'GRAY' | 'GRIFF' | 'GROM' | 'GUS' | 'HANK' | 'JACKY' | 'JANET' | 'JESSIE'
  | 'KIT' | 'LARRY & LAWRIE' | 'LEON' | 'LILY' | 'LOLA' | 'LOU' | 'MAISIE' | 'MANDY'
  | 'MAX' | 'MEG' | 'MELODIE' | 'MICO' | 'MORTIS' | 'MR. P' | 'NANI' | 'NITA'
  | 'OTIS' | 'PAM' | 'PEARL' | 'PENNY' | 'PIPER' | 'POCO' | 'R-T' | 'RICO'
  | 'ROSA' | 'RUFFS' | 'SAM' | 'SANDY' | 'SHELLY' | 'SPIKE' | 'SPROUT' | 'SQUEAK'
  | 'STU' | 'SURGE' | 'TARA' | 'TICK' | 'WILLOW' | 'All';

const brawlerNameList: BrawlerName[] = [
  '8-BIT',
  'AMBER',
  'ANGELO',
  'ASH',
  'BARLEY',
  'BEA',
  'BELLE',
  'BERRY',
  'BIBI',
  'BO',
  'BONNIE',
  'BROCK',
  'BULL',
  'BUSTER',
  'BUZZ',
  'BYRON',
  'CARL',
  'CHARLIE',
  'CHESTER',
  'CHUCK',
  'CLANCY',
  'COLETTE',
  'COLONEL RUFFS',
  'COLT',
  'CORDELIUS',
  'CROW',
  'DARRYL',
  'DOUG',
  'DRACO',
  'DYNAMIKE',
  'EDGAR',
  'EL PRIMO',
  'EMZ',
  'EVE',
  'FANG',
  'FRANK',
  'GALE',
  'GENE',
  'GRAY',
  'GRIFF',
  'GROM',
  'GUS',
  'HANK',
  'JACKY',
  'JANET',
  'JESSIE',
  'KIT',
  'LARRY & LAWRIE',
  'LEON',
  'LILY',
  'LOLA',
  'LOU',
  'MAISIE',
  'MANDY',
  'MAX',
  'MEG',
  'MELODIE',
  'MICO',
  'MORTIS',
  'MR. P',
  'NANI',
  'NITA',
  'OTIS',
  'PAM',
  'PEARL',
  'PENNY',
  'PIPER',
  'POCO',
  'R-T',
  'RICO',
  'ROSA',
  'RUFFS',
  'SAM',
  'SANDY',
  'SHELLY',
  'SPIKE',
  'SPROUT',
  'SQUEAK',
  'STU',
  'SURGE',
  'TARA',
  'TICK',
  'WILLOW'
];

interface BrawlerOption {
  value: BrawlerName;
  label: string;
}

interface BrawlerListProps {
  brawlerName: BrawlerName;
  changeBrawler: (brawlerName: BrawlerName) => void;
}

const BrawlerList: React.FC<BrawlerListProps> = ({ brawlerName, changeBrawler }) => {

  const change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as BrawlerName;
    changeBrawler(value);
  }
  const { t } = useTranslation();

  let bnList: BrawlerOption[] = brawlerNameList.map(name => {
    return {
      "value": name,
      "label": t(name)
    };
  });

  bnList.sort((a, b) => {
    if (a.label < b.label) return -1
    else return 1;
  });

  bnList.unshift({
    "value": "All",
    "label": "All"
  });

  return (
    <div className="form-floating">
      <select
        id="brawlerName"
        onChange={change}
        value={brawlerName}
        className="form-select"
      >
        {bnList.map((bn) => {
          return (
            <option key={bn.value} label={bn.label} value={bn.value}>
              {bn.label}
            </option>
          );
        })}
      </select>
      <label htmlFor="brawlerName">{String(t("brawler"))}</label>
    </div>
  );
}

export default BrawlerList;