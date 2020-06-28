class VisitRequest {
  setCompanyShortListedOffies = (shortListedOffices) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('short-list', JSON.stringify(shortListedOffices));
  };

  getCompanyShortListedOffies = () => {
    if (typeof localStorage !== 'undefined') {
      const shortListedOffices = localStorage.getItem('short-list');
      return shortListedOffices;
    } else {
      return null;
    }
  };

  setShowShortListPanelStatus = (status) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('showShortListPanelStatus', status);
    }
  };

  getShowShortListPanelStatus = () => {
    if (typeof localStorage !== 'undefined') {
      const showShortListPanelStatus = localStorage.getItem('showShortListPanelStatus') || false;
      return showShortListPanelStatus;
    } else {
      return false;
    }
  }
}

export default VisitRequest;
