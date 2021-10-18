import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
import React, { useState } from 'react';
import { Company } from '@csh/ui/api/types/company';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const companyActivity = (company: Company) => {
  let activity = company.JobReviews ? company.JobReviews.length : 0;
  activity += company.Interviews ? company.Interviews.length : 0;
  activity += company.Offers ? company.Offers.length : 0;
  return activity;
};

const sortMostActivity = (company1: Company, company2: Company) => {
  return companyActivity(company2) - companyActivity(company1);
};

const sortReviews = (company1: Company, company2: Company) => {
  return (
    (company2.JobReviews ? company2.JobReviews.length : 0) -
    (company1.JobReviews ? company1.JobReviews.length : 0)
  );
};

const sortAlphabetic = (company1: Company, company2: Company) => {
  return company1.name < company2.name ? -1 : 1;
};

export const SortSelector = (prop: { onSelect: (s: SortType) => void }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log(
    Object.entries(SortType).map((name, label) => {
      return (
        <DropdownItem onClick={() => prop.onSelect(name[1])}>
          {label}
        </DropdownItem>
      );
    })
  );

  const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle>
        Sort by <FontAwesomeIcon icon={faAngleDown} />
      </DropdownToggle>
      <DropdownMenu right>
        {Object.entries(SortType).map(name => {
          return (
            <DropdownItem onClick={() => prop.onSelect(name[1])}>
              {name[0]}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export const sortFunction = (s: SortType) => {
  switch (s) {
    case SortType.Alphabetical:
      return sortAlphabetic;
    case SortType.Reviews:
      return sortReviews;
    case SortType.Activity:
      return sortMostActivity;
  }
  return sortAlphabetic;
};

export enum SortType {
  Alphabetical = 'Alphabetical',
  Activity = 'Most Activity',
  Reviews = 'Most Reviews'
}
