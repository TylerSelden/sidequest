import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./header";
import { Footer } from "../global";

const Title = (props) => {
  return (
    <h1 className="my-3 fs-6 font-weight-bold">{ props.children }</h1>
  )
}
const Content = (props) => {
  return (
    <div className="fs-2 mb-5">
      { props.children }
    </div>
  )
}

const Terms = () => {
  return (
    <>
      <Header />
      <div className="container w-50 ms-5 mt-5">
        <Title>SideQuest</Title>
        <Content>
          Welcome to SideQuest! By accessing or using the app, you agree to be bound by the terms below. If you do not agree, please do not use SideQuest.
        </Content>

        <Title>Use at Your Own Risk</Title>
        <Content>
          SideQuest offers task suggestions meant to inspire real-world exploration, creativity, and engagement. However, all actions you take based on these suggestions are entirely your responsibility. You agree that you will not engage in any illegal, unsafe, prohibited, or otherwise irresponsible activities. The creator(s) and operator(s) of SideQuest are not liable for any consequences resulting from your use of the platform.
        </Content>

        <Title>Data Collection & Privacy</Title>
        <Content>
          SideQuest may collect information including, but not limited to, your activity on the platform, your account data, and your interactions with quests. This data is used solely for private, internal purposes such as improving the user experience, analyzing usage patterns, and providing user authentication services. We do not sell your data to third parties.
        </Content>

        <Title>Local Storage</Title>
        <Content>
          SideQuest uses browser localStorage to store user progress, preferences, and credentials. This is used to provide a smoother user experience.
        </Content>

        <Title>User Conduct</Title>
        <Content>
          You agree to comply with all applicable laws and regulations while using SideQuest. You must not use the platform to promote or engage in illegal, harmful, or disruptive behavior. By using SideQuest, you confirm that you are at least sixteen (16) years old. SideQuest reserves the right to deny access to any user, at any time, for any reason.
        </Content>

        <Title>Limitation of Liability</Title>
        <Content>
          To the maximum extent permitted by law, SideQuest and its creators disclaim all liability for any damages, injuries, or losses incurred while participating in any quest or activity that may have been inspired by the platform.
        </Content>

        <Title>Intellectual Property & License</Title>
        <Content>
          By using SideQuest, you are granted a limited, non-exclusive, non-transferable license to access and use the app solely for personal, non-commercial purposes. You may not reproduce, distribute, or create derivative works from the content provided on the platform without express written permission.
        </Content>

        <Title>Third-Party Libraries</Title>
        <Content>
          SideQuest uses third-party libraries, including but not limited to React, Bootstrap, and React-Icons. These libraries are governed by their respective licenses. Please refer to each library’s documentation for more details.
        </Content>

        <Title>Changes to These Terms</Title>
        <Content>
          These Terms of Use may be updated from time to time. Continued use of the platform after changes are made implies acceptance of the revised terms.
        </Content>
      </div>
      <Footer />
    </>
  );
}

export default Terms;
