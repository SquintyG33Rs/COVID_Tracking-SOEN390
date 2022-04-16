// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class LoginHomeelementsTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void loginHomeelements() {
    driver.get("http://localhost:8100/welcome-page");
    driver.manage().window().setSize(new Dimension(1944, 1210));
    driver.findElement(By.cssSelector(".main-button")).click();
    driver.findElement(By.name("ion-input-0")).click();
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.elementToBeClickable(By.name("ion-input-0")));
    }
    driver.findElement(By.name("ion-input-0")).sendKeys("simon");
    driver.findElement(By.name("ion-input-1")).sendKeys("patient");
    driver.findElement(By.cssSelector(".button-round")).click();
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".welcome")));
    }
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".md:nth-child(1) > #col_div > .sc-ion-label-md-h"));
      assert(elements.size() > 0);
    }
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".md:nth-child(2) > #col_div > .sc-ion-label-md-h"));
      assert(elements.size() > 0);
    }
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".md:nth-child(3) .sc-ion-label-md-h"));
      assert(elements.size() > 0);
    }
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".md:nth-child(4) .sc-ion-label-md-h"));
      assert(elements.size() > 0);
    }
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".md:nth-child(5) .sc-ion-label-md-h"));
      assert(elements.size() > 0);
    }
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".md:nth-child(6) .sc-ion-label-md-h"));
      assert(elements.size() > 0);
    }
  }
}
