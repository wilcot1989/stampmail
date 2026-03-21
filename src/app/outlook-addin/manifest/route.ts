// GET /outlook-addin/manifest — serves the Outlook add-in XML manifest with
// the correct Content-Type so Outlook / Microsoft 365 Admin Center accepts it.
//
// Sideload URL: https://neatstamp.com/outlook-addin/manifest
// IT Admin deployment URL for Microsoft 365 Admin Center:
//   Settings → Integrated apps → Upload custom apps → paste this URL

import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "edge";

// The manifest XML is stored in /outlook-addin/manifest.xml at the repo root.
// In production (Cloudflare Pages) we inline it here as a string so the Edge
// runtime can serve it without needing the filesystem.  During development the
// file is read from disk as a fallback (only in Node.js runtime).

const MANIFEST_XML = `<?xml version="1.0" encoding="UTF-8"?>
<OfficeApp xmlns="http://schemas.microsoft.com/office/appforoffice/1.1"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:bt="http://schemas.microsoft.com/office/officeappbasictypes/1.0"
           xmlns:mailappor="http://schemas.microsoft.com/office/mailappversionoverrides/1.0"
           xsi:type="MailApp">

  <Id>4b8f2e3a-9c1d-4f7b-a6e5-8d3c2b1a0f9e</Id>
  <Version>1.0.0.0</Version>
  <ProviderName>NeatStamp</ProviderName>
  <DefaultLocale>en-US</DefaultLocale>

  <DisplayName DefaultValue="NeatStamp Signatures" />
  <Description DefaultValue="Set your NeatStamp email signature in Outlook with one click. Works in Outlook Classic, New Outlook, OWA, and Outlook Mobile." />

  <IconUrl DefaultValue="https://neatstamp.com/icons/addin-icon-32.png" />
  <HighResolutionIconUrl DefaultValue="https://neatstamp.com/icons/addin-icon-80.png" />
  <SupportUrl DefaultValue="https://neatstamp.com/about" />

  <AppDomains>
    <AppDomain>https://neatstamp.com</AppDomain>
  </AppDomains>

  <Hosts>
    <Host Name="Mailbox" />
  </Hosts>

  <Requirements>
    <Sets>
      <Set Name="Mailbox" MinVersion="1.10" />
    </Sets>
  </Requirements>

  <FormSettings>
    <Form xsi:type="ItemEdit">
      <DesktopSettings>
        <SourceLocation DefaultValue="https://neatstamp.com/outlook-addin/taskpane" />
        <RequestedHeight>250</RequestedHeight>
      </DesktopSettings>
    </Form>
    <Form xsi:type="ItemRead">
      <DesktopSettings>
        <SourceLocation DefaultValue="https://neatstamp.com/outlook-addin/taskpane" />
        <RequestedHeight>250</RequestedHeight>
      </DesktopSettings>
    </Form>
  </FormSettings>

  <Permissions>ReadWriteMailbox</Permissions>

  <Rule xsi:type="RuleCollection" Mode="Or">
    <Rule xsi:type="ItemIs" ItemType="Message" FormType="Edit" />
    <Rule xsi:type="ItemIs" ItemType="Message" FormType="Read" />
  </Rule>

  <VersionOverrides xmlns="http://schemas.microsoft.com/office/mailappversionoverrides" xsi:type="VersionOverridesV1_0">
    <VersionOverrides xmlns="http://schemas.microsoft.com/office/mailappversionoverrides/1.1" xsi:type="VersionOverridesV1_1">

      <Requirements>
        <bt:Sets>
          <bt:Set Name="Mailbox" MinVersion="1.10" />
        </bt:Sets>
      </Requirements>

      <Hosts>
        <Host xsi:type="MailHost">

          <DesktopFormFactor>
            <FunctionFile resid="Commands.Url" />

            <ExtensionPoint xsi:type="MessageComposeCommandSurface">
              <OfficeTab id="TabDefault">
                <Group id="NeatStampGroup">
                  <Label resid="GroupLabel" />
                  <Icon>
                    <bt:Image size="16" resid="Icon.16x16" />
                    <bt:Image size="32" resid="Icon.32x32" />
                    <bt:Image size="80" resid="Icon.80x80" />
                  </Icon>
                  <Control xsi:type="Button" id="TaskpaneButton">
                    <Label resid="TaskpaneButton.Label" />
                    <Supertip>
                      <Title resid="TaskpaneButton.Label" />
                      <Description resid="TaskpaneButton.Tooltip" />
                    </Supertip>
                    <Icon>
                      <bt:Image size="16" resid="Icon.16x16" />
                      <bt:Image size="32" resid="Icon.32x32" />
                      <bt:Image size="80" resid="Icon.80x80" />
                    </Icon>
                    <Action xsi:type="ShowTaskpane">
                      <TaskpaneId>ButtonId1</TaskpaneId>
                      <SourceLocation resid="Taskpane.Url" />
                    </Action>
                  </Control>
                </Group>
              </OfficeTab>
            </ExtensionPoint>

            <ExtensionPoint xsi:type="MessageReadCommandSurface">
              <OfficeTab id="TabDefault">
                <Group id="NeatStampReadGroup">
                  <Label resid="GroupLabel" />
                  <Icon>
                    <bt:Image size="16" resid="Icon.16x16" />
                    <bt:Image size="32" resid="Icon.32x32" />
                    <bt:Image size="80" resid="Icon.80x80" />
                  </Icon>
                  <Control xsi:type="Button" id="TaskpaneButtonRead">
                    <Label resid="TaskpaneButton.Label" />
                    <Supertip>
                      <Title resid="TaskpaneButton.Label" />
                      <Description resid="TaskpaneButton.Tooltip" />
                    </Supertip>
                    <Icon>
                      <bt:Image size="16" resid="Icon.16x16" />
                      <bt:Image size="32" resid="Icon.32x32" />
                      <bt:Image size="80" resid="Icon.80x80" />
                    </Icon>
                    <Action xsi:type="ShowTaskpane">
                      <TaskpaneId>ButtonId2</TaskpaneId>
                      <SourceLocation resid="Taskpane.Url" />
                    </Action>
                  </Control>
                </Group>
              </OfficeTab>
            </ExtensionPoint>

            <ExtensionPoint xsi:type="LaunchEvent">
              <LaunchEvents>
                <LaunchEvent Type="OnNewMessageCompose" FunctionName="onNewMessageComposeHandler" />
                <LaunchEvent Type="OnNewReplyCompose" FunctionName="onNewReplyComposeHandler" />
              </LaunchEvents>
              <SourceLocation resid="Commands.Url" />
            </ExtensionPoint>

          </DesktopFormFactor>

          <MobileFormFactor>
            <ExtensionPoint xsi:type="MobileMessageComposeCommandSurface">
              <Control xsi:type="MobileButton" id="MobileTaskpaneButton">
                <Label resid="TaskpaneButton.Label" />
                <Icon>
                  <bt:Image size="25" scale="1" resid="Icon.32x32" />
                  <bt:Image size="25" scale="2" resid="Icon.80x80" />
                  <bt:Image size="32" scale="1" resid="Icon.32x32" />
                  <bt:Image size="32" scale="2" resid="Icon.80x80" />
                  <bt:Image size="48" scale="1" resid="Icon.80x80" />
                  <bt:Image size="48" scale="2" resid="Icon.80x80" />
                </Icon>
                <Action xsi:type="ShowTaskpane">
                  <SourceLocation resid="Taskpane.Url" />
                </Action>
              </Control>
            </ExtensionPoint>
          </MobileFormFactor>

        </Host>
      </Hosts>

      <Resources>
        <bt:Images>
          <bt:Image id="Icon.16x16" DefaultValue="https://neatstamp.com/icons/addin-icon-16.png" />
          <bt:Image id="Icon.32x32" DefaultValue="https://neatstamp.com/icons/addin-icon-32.png" />
          <bt:Image id="Icon.80x80" DefaultValue="https://neatstamp.com/icons/addin-icon-80.png" />
        </bt:Images>
        <bt:Urls>
          <bt:Url id="Commands.Url" DefaultValue="https://neatstamp.com/outlook-addin/commands" />
          <bt:Url id="Taskpane.Url" DefaultValue="https://neatstamp.com/outlook-addin/taskpane" />
        </bt:Urls>
        <bt:ShortStrings>
          <bt:String id="GroupLabel" DefaultValue="NeatStamp" />
          <bt:String id="TaskpaneButton.Label" DefaultValue="NeatStamp Signatures" />
        </bt:ShortStrings>
        <bt:LongStrings>
          <bt:String id="TaskpaneButton.Tooltip" DefaultValue="Open NeatStamp to set or update your email signature" />
        </bt:LongStrings>
      </Resources>

    </VersionOverrides>
  </VersionOverrides>

</OfficeApp>`;

export async function GET() {
  return new NextResponse(MANIFEST_XML, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Allow Outlook to fetch the manifest cross-origin
      "Access-Control-Allow-Origin": "*",
      // Cache for 1 hour — Outlook caches manifests aggressively
      "Cache-Control": "public, max-age=3600",
    },
  });
}
