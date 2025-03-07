import React, { useState } from 'react';
import {
  // ... keep previous imports ...
  IonList,
  IonIcon
} from '@ionic/react';
import { 
  calculatorOutline, 
  calendarOutline, 
  filterOutline,
  cashOutline,
  scaleOutline,
  timeOutline,
  cardOutline,
  phonePortraitOutline,
  helpCircleOutline,
  walletOutline
} from 'ionicons/icons';

// ... keep existing state and functions ...
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonRange,
  IonSearchbar,
  IonMenuButton,
  IonButtons,
  IonMenu,
  
  
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(25000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [investedAmount, setInvestedAmount] = useState<number>(3000000);
  const [selectedTab, setSelectedTab] = useState<'sip' | 'lumpsum'>('sip');
  const [searchText, setSearchText] = useState<string>('');

  const calculateSip = () => {
    const months = timePeriod * 12;
    const monthlyRate = expectedReturnRate / 12 / 100;
    const futureValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * 
      (1 + monthlyRate));
    setInvestedAmount(futureValue);
  };

  const formatIndianCurrency = (num: number) => {
    return num.toLocaleString('en-IN', { 
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    }).replace('₹', '₹ ');
  };

  return (
    <IonPage>
      {/* Menu Bar */}
      <IonMenu side="start" contentId="main-content">
        <IonHeader>
          <IonToolbar className="menu-toolbar">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
    <IonList lines="none">
      {/* Login/Register Section */}
      <IonItem className="menu-item highlight-item">
        <IonLabel>Login/Register</IonLabel>
      </IonItem>

      {/* Gro Section */}
      <IonItem className="menu-item category-header">
        <IonLabel>Gro</IonLabel>
      </IonItem>
      <IonItem className="sub-item">
        <IonIcon slot="start" icon={calculatorOutline} />
        <IonLabel>SIP Calc</IonLabel>
      </IonItem>
      <IonItem className="sub-item">
        <IonIcon slot="start" icon={calendarOutline} />
        <IonLabel>SIP Monthly</IonLabel>
      </IonItem>

      {/* Filter Section */}
      <div className="divider" />
      <IonItem className="menu-item">
        <IonIcon slot="start" icon={filterOutline} />
        <IonLabel>Filter Stocks</IonLabel>
      </IonItem>
      <IonItem className="menu-item">
        <IonIcon slot="start" icon={filterOutline} />
        <IonLabel>Filter Mutual Funds</IonLabel>
      </IonItem>
      <IonItem className="menu-item">
        <IonIcon slot="start" icon={filterOutline} />
        <IonLabel>Filter US Stocks</IonLabel>
      </IonItem>

      {/* Financial Tools */}
      <div className="divider" />
      <IonItem className="menu-item">
        <IonIcon slot="start" icon={cashOutline} />
        <IonLabel>Smart Save</IonLabel>
      </IonItem>
      <IonItem className="menu-item">
        <IonIcon slot="start" icon={scaleOutline} />
        <IonLabel>Compare Funds</IonLabel>
      </IonItem>

      {/* Time Section */}
      <div className="divider" />
      <IonItem className="menu-item category-header">
        <IonLabel>Time per week</IonLabel>
      </IonItem>
      <IonItem className="menu-item">
        <IonIcon slot="start" icon={timeOutline} />
        <IonLabel>Credit</IonLabel>
      </IonItem>
      <IonItem className="menu-item">
        <IonIcon slot="start" icon={phonePortraitOutline} />
        <IonLabel>View in App</IonLabel>
      </IonItem>
      <IonItem className="menu-item">
        <IonIcon slot="start" icon={helpCircleOutline} />
        <IonLabel>Help and Support</IonLabel>
      </IonItem>

      {/* Invested Section */}
      <div className="divider" />
      <IonItem className="menu-item">
        <IonIcon slot="start" icon={walletOutline} />
        <IonLabel>Invested</IonLabel>
      </IonItem>
    </IonList>
  </IonContent>
</IonMenu>
        

      {/* Main Content */}
      <IonHeader>
        <IonToolbar className="header-toolbar">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} className="menu-button" />
          </IonButtons>
          <IonTitle>Groww</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="main-content" className="ion-content">
        {/* Search Bar */}
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
          placeholder="Search stocks, ETFs, or more"
          className="search-bar"
        />

        {/* SIP Calculator */}
        <IonGrid className="main-grid">
          <IonRow className="title-row">
            <IonCol>
              <h2 className="main-title">SIP Calculator</h2>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonSegment 
                value={selectedTab}
                onIonChange={e => setSelectedTab(e.detail.value as any)}
                className="tab-segment"
              >
                <IonSegmentButton value="sip" className="tab-button">
                  <IonLabel>SIP</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="lumpsum" className="tab-button">
                  <IonLabel>Lumpsum</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard className="calculator-card">
                <IonCardContent>
                  <IonGrid className="input-grid">
                    {/* Monthly Investment */}
                    <div className="input-container">
                      <IonItem lines="none" className="input-item">
                        <IonLabel className="input-label">Monthly investment</IonLabel>
                        <IonInput
                          value={monthlyInvestment}
                          onIonChange={e => setMonthlyInvestment(parseFloat(e.detail.value!))}
                          className="currency-input"
                          type="number"
                        ></IonInput>
                      </IonItem>
                      <IonRange 
                        min={5000} 
                        max={100000} 
                        step={5000} 
                        value={monthlyInvestment}
                        onIonChange={e => setMonthlyInvestment(e.detail.value as number)}
                        className="custom-range"
                      >
                        <IonLabel slot="start">₹5K</IonLabel>
                        <IonLabel slot="end">₹1L</IonLabel>
                      </IonRange>
                    </div>

                    {/* Expected Return Rate */}
                    <div className="input-container">
                      <IonItem lines="none" className="input-item">
                        <IonLabel className="input-label">Expected return rate (p.a)</IonLabel>
                        <IonInput
                          value={expectedReturnRate}
                          onIonChange={e => setExpectedReturnRate(parseFloat(e.detail.value!))}
                          className="percentage-input"
                          type="number"
                        ></IonInput>
                      </IonItem>
                      <IonRange 
                        min={1} 
                        max={30} 
                        step={0.5} 
                        value={expectedReturnRate}
                        onIonChange={e => setExpectedReturnRate(e.detail.value as number)}
                        className="custom-range"
                      >
                        <IonLabel slot="start">1%</IonLabel>
                        <IonLabel slot="end">30%</IonLabel>
                      </IonRange>
                    </div>

                    {/* Time Period */}
                    <div className="input-container">
                      <IonItem lines="none" className="input-item">
                        <IonLabel className="input-label">Time period</IonLabel>
                        <IonInput
                          value={timePeriod}
                          onIonChange={e => setTimePeriod(parseFloat(e.detail.value!))}
                          className="year-input"
                          type="number"
                        >
                          <span className="result-value">
                           {formatIndianCurrency(timePeriod)}
                          </span>
                        </IonInput>
                      </IonItem>
                      <IonRange 
                        min={1} 
                        max={30} 
                        step={1} 
                        value={timePeriod}
                        onIonChange={e => setTimePeriod(e.detail.value as number)}
                        className="custom-range"
                      >
                        <IonLabel slot="start">1Yr</IonLabel>
                        <IonLabel slot="end">30Yr</IonLabel>
                      </IonRange>
                    </div>

                    {/* Invested Amount Display */}
                    <div className="result-display">
                      <span className="result-label">Invested amount</span>
                      <span className="result-value">
                        {formatIndianCurrency(investedAmount)}
                      </span>
                    </div>

                    {/* SIP Button */}
                    <IonButton 
                      expand="block" 
                      className="sip-button"
                      onClick={calculateSip}
                    >
                      Calculat SIP
                    </IonButton>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};      

export default Home;