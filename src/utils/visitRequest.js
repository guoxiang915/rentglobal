class VisitRequest {
  setCompanyVisitRequests = (visitRequests) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('visitRequests', JSON.stringify(visitRequests));
  };

  getCompanyVisitRequests = () => {
    if (typeof localStorage !== 'undefined') {
      const visitRequests = localStorage.getItem('visitRequests');
      return visitRequests;
    } else {
      return null;
    }
  }

  setShowVisitRequestsPanelStatus = (status) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('showVisitRequestsPanelStatus', status);
    }
  }

  getShowVisitRequestsPanelStatus = () => {
    if (typeof localStorage !== 'undefined') {
      const showVisitRequestsPanelStatus = localStorage.getItem('showVisitRequestsPanelStatus') || false;
      return showVisitRequestsPanelStatus;
    } else {
      return false;
    }
  }
}

export default VisitRequest;
